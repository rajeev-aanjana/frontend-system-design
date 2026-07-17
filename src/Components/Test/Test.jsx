import React, { useEffect, useRef, useState } from "react";

const INITIAL_STATE = {
  Todo: ["Task 1", "Task 2", "Task 3"], 
  "In Progress": ["Task 4", "Task 5"],
  Completed: ["Task 8", "Task 9"],
};

const Test = () => {
  const [data, setData] = useState(INITIAL_STATE);
  const [input, setInput] = useState("");

  const stateRef = useRef();
  const taskref = useRef();

  const handleDragStart = (e, item, state) => {
    stateRef.current = state;
    taskref.current = item;
    e.target.style.opacity = "0.5";
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
  };

  const handleDrop = (e, targetState) => {
    const sourceState = stateRef.current;
    const item = taskref.current;
    setData((prev) => {
      const newData = { ...prev };
      newData[sourceState] = newData[sourceState].filter(
        (task) => task != item,
      );
      newData[targetState] = [...newData[targetState], item];
      return newData;
    });
  };

const handleTaskSubmit = ()=>{
  if(!input.trim()) return
  setData(prev=> ({...prev, Todo:[...prev.Todo, input]}))
  setInput("")
}

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="p-10 text-center">
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="w-100 p-1 mb-10 border"
          placeholder="wirte here...."
        />
        <button onClick={handleTaskSubmit} className="border p-1 mx-2 hover:bg-gray-300 cursor-pointer">
          Add Task
        </button>
      </div>
      <div className="flex justify-around">
        {Object.keys(data).map((state, indx) => (
          <div
            key={indx}
            onDrop={(e) => {
              handleDrop(e, state);
            }}
            onDragOver={(e) => e.preventDefault()}
            className="bg-gray-300 w-80 p-5"
          >
            <h1 className="font-bold text-2xl my-5">{state}</h1>
            {data[state].map((item, indx) => (
              <div
                draggable
                onDragStart={(e) => {
                  handleDragStart(e, item, state);
                }}
                onDragEnd={(e) => handleDragEnd(e)}
                key={indx}
                className="p-2 bg-white my-2 cursor-move"
              >
                <h2>{item}</h2>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test;
