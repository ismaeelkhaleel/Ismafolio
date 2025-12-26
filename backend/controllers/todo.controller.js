import Todo from "../models/todo.model.js";

// Create a new todo item
export const createTodo = async (req, res) => {
  try {
    const { name, status, date, time } = req.body;
    const todo = new Todo({ name, status, date, time });
    await todo.save();
    res.status(201).json({ message: "Todo added successfully", todo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get all todo items
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a todo item
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, time } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      id,
      { status, time },
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo updated successfully", todo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a todo item
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
