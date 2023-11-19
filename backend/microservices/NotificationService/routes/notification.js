const express = require("express");
const NotificationController = require("../controllers/notification");
const router = express.Router();

// Assuming you have middleware for authentication and validation in place
router.get("/notifications", NotificationController.getAllNotifications);
router.post("/notifications", NotificationController.createNotification);
router.get("/notifications/:id", NotificationController.getNotificationById);
router.put("/notifications/:id", NotificationController.updateNotification);
router.delete("/notifications/:id", NotificationController.deleteNotification);

module.exports = router;