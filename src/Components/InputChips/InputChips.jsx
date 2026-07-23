import React, { useState } from "react";

const InputChips = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  const handleAdd = (e) => {
    if (e.key !== "Enter" || !input.trim()) return;
    setData((prev) => [...prev, { id: Date.now(), name: input }]);
    setInput("");
  };

  const deleteTask = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div>
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => handleAdd(e)}
          type="text"
          placeholder="type here..."
          className="border w-100 p-2"
        />
        <div className="grid grid-cols-3 gap-4 pt-5">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-gray-400 p-2 px-4 flex justify-between rounded-3xl"
            >
              <span>{item.name}</span>{" "}
              <span
                className="text-sm cursor-pointer"
                onClick={() => deleteTask(item.id)}
              >
                ❌
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InputChips;
