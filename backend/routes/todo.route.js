import express from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();
router.post("/create", verifyToken, createTodo);
router.get("/all", verifyToken, getTodos);
router.put("/update/:id", verifyToken, updateTodo);
router.delete("/delete/:id", verifyToken, deleteTodo);