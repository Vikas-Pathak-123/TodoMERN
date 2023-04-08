import express from "express";

const router = express.Router();

let todos = [ {
        "id": 1,
        "newTodo": "Vikas"
    },
    {
        "id": 2,
        "newTodo": "Pawan"
    },
    {
        "id": 3,
        "newTodo": "Rohan"
    },
    {
        "id": 4,
        "newTodo": "Mayank"
    },
    {
        "id": 5,
        "newTodo": "Vaibhav"
    },
    {
        "id": 6,
        "newTodo": "Shyam"
    },
    {
        "id": 7,
        "newTodo": "Gargi"
    },
    {
        "id": 8,
        "newTodo": "Arpit"
    },
    {
        "id": 9,
        "newTodo": "Suman"
    },
    {
        "id": 10,
        "newTodo": "Shaloo"
    },
    {
        "id": 11,
        "newTodo": "Chitra"
    },
    {
        "id": 12,
        "newTodo": "Rathi"
    },
    {
        "id": 13,
        "newTodo": "Bauwa"
    },
    {
        "id": 14,
        "newTodo": "Bittu"
    },
    {
        "id": 15,
        "newTodo": "Sharthak"
    },
    { 
        "id": 16,
        "newTodo": "Vaibhav"
    }];

router.get("/", (req, res) => {
  if (todos.length === 0) {
    return res
      .status(400)
      .json({
        message:
          "Data not exist or Array is Empty. Add some data by POST method.",
      });
  }
  res.json(todos);
});



router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res
      .status(400)
      .json({ message: "Invalid ID. ID must be a number." });
  }
  const singleTodo = todos.find((todo) => todo.id === id);
  if (singleTodo) {
    res.json(singleTodo);
  } else {
    res.status(404).json({ message: "Todo not found." });
  }
});



router.post("/", (req, res) => {
  const { newTodo } = req.body;
  if (!newTodo) {
    return res
      .status(400)
      .json({ message: "newTodo property is missing in request body." });
  }
  const id = todos.length + 1;
  todos.push({ id, newTodo });
  res.json({
    status: "success",
    message: "Task added successfully",
    todo: { id, newTodo },
  });
});



router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res
      .status(400)
      .json({ message: "Invalid ID. ID must be a number." });
  }
  const updatedTodo = req.body;
  if (!updatedTodo) {
    return res.status(400).json({ message: "Request body is empty." });
  }
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Todo not found." });
  }
  todos[index] = { ...todos[index], ...updatedTodo };
  res.json({
    status: "success",
    message: "Todo updated",
    updatedTodo: todos[index],
  });
});



router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res
      .status(400)
      .json({ message: "Invalid ID. ID must be a number." });
  }
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Todo not found." });
  }
  todos.splice(index, 1);
  res.json({ message: "Todo deleted" });
});


export default router;
