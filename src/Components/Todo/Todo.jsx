import React, { useState } from "react";

function Todo() {
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState([]);
  const [editId, setEditId] = useState(null);

  function addOrUpdateTodo() {
    if (!input.trim()) return;

    // UPDATE
    if (editId !== null) {
      setTodo((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...item, todoMsg: input } : item
        )
      );
      setEditId(null);
    }
    // ADD
    else {
      setTodo((prev) => [
        ...prev,
        {
          id: Date.now(),
          todoMsg: input,
          isCompleted: false,
        },
      ]);
    }

    setInput("");
  }

  function deleteTodo(id) {
    setTodo((prev) => prev.filter((item) => item.id !== id));
  }

  function toggleCompleted(id) {
    setTodo((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, isCompleted: !item.isCompleted }
          : item
      )
    );
  }

  function editTodo(item) {
    setInput(item.todoMsg);
    setEditId(item.id);
  }

  return (
    <>
      <div>
        <input
          className="border m-5 p-2"
          placeholder="Type Here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-amber-300 rounded border p-2"
          onClick={addOrUpdateTodo}
        >
          {editId !== null ? "Update" : "Add"}
        </button>
      </div>

      <ul>
        {todo.map((item) => (
          <li key={item.id} className="ml-10 p-2 flex items-center">
            <input
              type="checkbox"
              checked={item.isCompleted}
              onChange={() => toggleCompleted(item.id)}
              className="m-2"
            />

            <span
              className={`mr-4 ${
                item.isCompleted ? "line-through text-gray-500" : ""
              }`}
            >
              {item.todoMsg}
            </span>

            <button
              className="border px-2 bg-blue-400 mr-2"
              onClick={() => editTodo(item)}
            >
              Edit
            </button>

            <button
              className="border px-2 bg-red-600 text-white"
              onClick={() => deleteTodo(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todo;

