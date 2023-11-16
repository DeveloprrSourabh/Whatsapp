const express = require("express");
const { requireSign } = require("../Middlewares/authMiddleware");
const {
  createChatController,
  getChatController,
  getRecChatController,
  deleteChatController,
} = require("../Controllers/chatController");

const router = express.Router();

// SEND MESSAGE || METHOD POST
router.post("/create-chat", requireSign, createChatController);

// GET SENDING MESSAGE || METHOD GET
router.get("/send-chat", requireSign, getChatController);

// GET RECEVING MESSAGE || METHOD GET
router.get("/receive-chat/:id", requireSign, getRecChatController);

// DELETE MESSAGE || METHOD DELETE
router.delete("/delete-chat/:id", requireSign, deleteChatController);

module.exports = router;
