import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

const username = process.env.USERNAME;
const password = process.env.PASSWORD; 

mongoose.connect(
  `mongodb+srv://123${username}vp79:${password}@cluster0.fugcxfg.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.log(error));


// Define the Todo schema
const todoSchema = new mongoose.Schema({
  newTodo: {
    type: String,
    required: true,
  },
});

// Define the Todo model
const Todo = mongoose.model("Todo", todoSchema);

// GET all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().exec();
    if (todos.length === 0) {
      return res.status(400).json({
        message:
          "Data not exist or Array is Empty. Add some data by POST method.",
      });
    }
    res.json(todos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET a todo by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const singleTodo = await Todo.findOne({ _id: id }).exec();
    if (singleTodo) {
      res.json(singleTodo);
    } else {
      res.status(404).json({ message: "Todo not found." });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// CREATE a new todo
router.post("/", async (req, res) => {
  const { newTodo } = req.body;
  if (!newTodo) {
    return res
      .status(400)
      .json({ message: "newTodo property is missing in request body." });
  }
  const todo = new Todo({ newTodo: newTodo });
  try {
    const savedTodo = await todo.save();
    res.json({
      status: "success",
      message: "Task added successfully",
      todo: savedTodo,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.put("/:id", async (req, res) => {
  const id = req.params.id;
  
  const updatedTodo = req.body;
  if (!updatedTodo) {
    return res.status(400).json({ message: "Request body is empty." });
  }
  try {
    const updated = await Todo.findByIdAndUpdate(
      id,
      updatedTodo,
      { new: true }
    ).exec();
    if (!updated) {
      return res.status(404).json({ message: "Todo not found." });
    }
    res.json({
      status: "success",
      message: "Todo updated",
      updatedTodo: updated,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found." });
    }
    res.json({
      status: "success",
      message: "Todo deleted",
      deletedTodo: deletedTodo,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



export default router;
