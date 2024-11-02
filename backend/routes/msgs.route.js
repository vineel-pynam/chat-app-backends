import express from 'express';
import { getMessagesForConversation } from '../controllers/msgs.controller.js';

const router = express.Router();

router.get('/', getMessagesForConversation);

export default router;