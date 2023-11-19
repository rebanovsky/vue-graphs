const Notification = require("../models/Notification");

const NotificationController = {
  // GET /notifications
  getAllNotifications: async (req, res) => {
    try {
      const { userId } = req.params; // Assuming you're getting the user's ID from the route params or JWT token
      const notifications = await Notification.find({ userId }).sort({
        createdAt: -1,
      });
      res.json(notifications);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // POST /notifications
  createNotification: async (req, res) => {
    try {
      const { userId, title, message, tickerSymbol, type, link } = req.body;
      const newNotification = new Notification({
        userId,
        title,
        message,
        tickerSymbol,
        type,
        link,
      });
      const savedNotification = await newNotification.save();
      res.status(201).json(savedNotification);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  // GET /notifications/:id
  getNotificationById: async (req, res) => {
    try {
      const { id } = req.params;
      const notification = await Notification.findById(id);
      if (!notification) {
        return res.status(404).send("Notification not found");
      }
      res.json(notification);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // PUT /notifications/:id
  updateNotification: async (req, res) => {
    try {
      const { id } = req.params;
      const { read } = req.body;
      const notification = await Notification.findByIdAndUpdate(
        id,
        { read },
        { new: true }
      );
      if (!notification) {
        return res.status(404).send("Notification not found");
      }
      res.json(notification);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  // DELETE /notifications/:id
  deleteNotification: async (req, res) => {
    try {
      const { id } = req.params;
      const notification = await Notification.findByIdAndDelete(id);
      if (!notification) {
        return res.status(404).send("Notification not found");
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = NotificationController;
