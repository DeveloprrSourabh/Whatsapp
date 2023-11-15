const express = require("express");
const { requireSign } = require("../Middlewares/authMiddleware");
const {
  createChatController,
  getChatController,
  getRecChatController,
} = require("../Controllers/chatController");

const router = express.Router();

// SEND MESSAGE || METHOD POST
router.post("/create-chat", requireSign, createChatController);

// GET SENDING MESSAGE || METHOD GET
router.get("/send-chat", requireSign, getChatController);

// GET RECEVING MESSAGE || METHOD GET
router.get("/receive-chat/:id", requireSign, getRecChatController);

module.exports = router;
