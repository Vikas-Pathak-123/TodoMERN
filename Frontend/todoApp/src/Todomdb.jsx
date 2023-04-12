import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function Todomdb() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    axios
      .get("https://todoserver-7w9m.onrender.com/todomdb")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error(error));
  }, [todos, newTodo, editingTodo]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!newTodo) return toast.error("Please Add your Task");
    if (editingTodo) {
      axios
        .put(`https://todoserver-7w9m.onrender.com/todomdb/${editingTodo._id}`, { newTodo })
        .then((response) => {
          setTodos(
            todos.map((todo) => {
              if (todo._id === editingTodo._id) {
                return response.data.updatedTodo;
              }
              return todo;
            })
          );
          setEditingTodo(null);
          toast.success("Task updated successfully");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Task not updated successfully");
        });
    } else {
      axios
        .post("https://todoserver-7w9m.onrender.com/todomdb", { newTodo })
        .then((response) => {
          const { id, newTodo } = response.data.todo;
          setTodos([...todos, { id, newTodo }]);
          toast.success("Task Added successfully");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error while Adding Task");
        });
    }
    setNewTodo("");
  }

  function handleDelete(id) {
    axios
      .delete(`https://todoserver-7w9m.onrender.com/todomdb/${id}`)
      .then((response) => {
        setTodos(todos.filter((todo) => todo._id !== id));
        toast.success("Task deleted successfully");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error while deleting Task");
      });
  }

  function handleEdit(todo) {
    setNewTodo(todo.newTodo);
    setEditingTodo(todo);
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="flex mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
            placeholder="Add new task"
            className="flex-grow px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-indigo-500 rounded hover:bg-indigo-600"
          >
            {editingTodo ? "Update" : "Add"}
          </button>
        </div>
      </form>
      {todos.length === 0 && (
        <p className="text-gray-700">No tasks added yet.</p>
      )}
      {todos.length > 0 && (
        <ul className="bg-white rounded shadow">
          {todos.map((todo) => (
            <li key={todo._id} className="flex items-center px-4 py-2 border-b">
              <span className="flex-grow text-gray-900">{todo.newTodo}</span>
              <button
                onClick={() => handleEdit(todo)}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(todo._id)}
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Todomdb;
