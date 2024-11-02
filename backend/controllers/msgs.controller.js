import conversationModel from "../models/chat.model.js";

export const addMessagesToConversation = async (participants, msg) => {
  try{

    // Find conversation by participants
    let conversation = await conversationModel.findOne({users: { $all: participants}});

    // If conversation does not exist, create a new one
    if(!conversation) {
      conversation = new conversationModel({
        users: participants,
        msgs: []
      });
    }

    // Add message to conversation
    conversation.msgs.push(msg);
    await conversation.save();
    console.log("Conversation updated successfully!");
  } catch(error) {
    console.log("Conversation not updated!");
  }
}

export const getMessagesForConversation = async (req, res) => {
  const {sender, receiver} = req.query;
  console.log(sender, " to ",  receiver);
  const participants = [sender, receiver];
  try {
    const conversation = await conversationModel.findOne({users: { $all: participants}});
    if(conversation) {
      return res.status(200).json(conversation.msgs);
    }
    console.log("No conversation found!");
    return res.status(200).json([]);
  } catch(error) {
    return res.status(500).json({error: "Internal server error"});
  }
}