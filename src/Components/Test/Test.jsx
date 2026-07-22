import React, { useState } from "react";

const Test = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  const handleAdd = (e) => {
    if (e.key !== "Enter" || !input.trim()) return;

    setData((prev) => [...prev, { id: Date.now(), name: input.trim() }]);
    setInput("");
  };

  const deletTask = (id) => {
    console.log(id)
    setData((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <div className="flex justify-center items-center h-100 w-full">
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => handleAdd(e)}
          autoFocus
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
                onClick={() => deletTask(item.id)}
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

export default Test;
