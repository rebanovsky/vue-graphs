const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Insider = require("./models/insider");
const EightKs = require("./models/eightk");
const Tenqs = require("./models/tenq");
const socketIo = require("socket.io");
const run_conversation = require("./microservices/ChatService/worker/index");

const {
  start: startRabbitMQ,
  consumeEarnings,
} = require("./helpers/rabbit/channels");

dotenv.config({ path: "./config.env" });

const { app } = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const queueName = process.env.QUEUE_NAME;

const http = require("http");
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  // Listen to changes in the Item collection
  const insidersStream = Insider.watch();
  const eightkStream = EightKs.watch();
  const tenqStream = Tenqs.watch();

  insidersStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const newItem = change.fullDocument;
      console.log("New item added to the database:", newItem);
      socket.emit("newInsiderItem", newItem);
    }
  });

  eightkStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const newItem = change.fullDocument;
      console.log("New item added to the database:", newItem);
      socket.emit("newEightKItem", newItem);
    }
  });

  tenqStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const newItem = change.fullDocument;
      console.log("New item added to the database:", newItem);
      socket.emit("newTenqItem", newItem);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    insidersStream.close();
    eightkStream.close();
    tenqStream.close();
  });
});

const port = process.env.PORT || 3000;

app.post("/run-conversation", async (req, res) => {
  try {
    const userContent = req.body.content;
    const response = await run_conversation(userContent);
    console.log("response: ", response.choices[0].message);
    res.json(response);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// // Load the JavaScript file as a module
// const { geoJson } = require('/Users/fox/vue-graphs/frontend/src/data/geoJson.js');

// // Use Node.js to write the object to a file as JSON
// const fs = require('fs');
// fs.writeFileSync('/Users/fox/vue-graphs/frontend/src/data/geoJson.json', JSON.stringify(geoJson, null, 2));

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("DB connection established");
    try {
      await startRabbitMQ();
      await consumeEarnings(queueName, (msg) => {
        io.emit("newEarningsNotification", msg);
      });
      console.log("running rabbitMQ");
    } catch (err) {
      console.error("Failed to start RabbitMQ consumer:", err);
    }

    server.listen(port, () => {
      console.log(`App running on port ${port}...`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
  });
