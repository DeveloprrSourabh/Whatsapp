const Chat = require("../Models/chatModel");

// Chat Create
exports.createChatController = async (req, res) => {
  try {
    const { message, senderId, receiverId } = req.body;
    if (!message) {
      return res.status(400).send({
        success: false,
        message: "Enter a Valid Message",
      });
    }

    // Create Message
    const chat = await new Chat({
      message,
      senderId: req.user._id,
      receiverId,
    }).save();
    return res.status(200).send({
      success: true,
      message: "Message Send Successfully",
      chat,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Sending Message",
      error,
    });
  }
};

// Get Sending Chat
exports.getChatController = async (req, res) => {
  try {
    const chat = await Chat.find({
      senderId: req.user._id,
      receiverId: req.params.id,
    });
    return res.status(200).send({
      success: true,
      message: "Getting Sending Message",
      chat,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Getting Chat",
      error,
    });
  }
};
// Get Receving Chat
exports.getRecChatController = async (req, res) => {
  try {
    const chat = await Chat.find({
      senderId: req.params.id,
      receiverId: req.user._id,
    });
    return res.status(200).send({
      success: true,
      message: "Getting Receving Message",
      chat,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Getting Chat",
      error,
    });
  }
};
