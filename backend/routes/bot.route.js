import express from "express";
import { chatWithBot } from "../controllers/bot.controller.js";

const router = express.Router();

router.post("/bot/chat", chatWithBot);

export default router;