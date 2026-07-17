
import React, { useRef, useState } from "react";

const INITIAL_DATA = {
  Todo: [
    {
      id: 1,
      task: "Task-1",
    },
    {
      id: 2,
      task: "Task-2",
    },
    {
      id: 3,
      task: "Task-3",
    },
    {
      id: 4,
      task: "Task-4",
    },
  ],
  "In Progress": [
    { id: 5, task: "Task-5" },
    { id: 6, task: "Task-6" },
  ],
  Completed: [
    {
      id: 7,
      task: "Task-7",
    },
    {
      id: 8,
      task: "Task-8",
    },
  ],
};

const DragAndDrop = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const [input, setInput] = useState("")
  const dragStateRef = useRef();
  const dragItemRef = useRef();

  const handleDragStart = (e, state, item) => {
    dragItemRef.current = item;
    dragStateRef.current = state;
    // console.log("Current drag state and item ===> " + item.task, state)
    e.target.style.opacity = "0.5";
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
  };

  console.log("Current Data:---> ", data)
  const handleDrop = (e, targetState) => {
    const sourceState = dragStateRef.current;
    const item = dragItemRef.current;
    setData((prev) => {
      const newData = { ...prev };
      newData[sourceState] = newData[sourceState].filter(
        (task) => task.id !== item.id,
      );
      newData[targetState] = [...newData[targetState], item];
      console.log("New data---:", newData);
      return newData;
    });
  };

  const handleTaskAdd = ()=>{
    if(!input.trim()) return
    // setData((prev)=> [...prev.Todo, {id: Date.now(), task: input}])
    setData((prev)=> ({...prev, Todo:[...prev.Todo, {id: Date.now(), task: input}]}))
    setInput("")
  }
  console.log("After adding task from input:---", data)
  return (
    <>
      <div className="p-10 text-center">
        <div className="mb-10">
          <input value={input} onChange={(e)=>setInput(e.target.value)} className="border p-2 w-100" type="text" placeholder="types here.." />
          <button onClick={handleTaskAdd} className="border p-2 mx-2 hover:bg-blue-500 cursor-pointer">Add Task</button>
        </div>
        <div className="flex justify-around">
          {Object.keys(data).map((state, indx) => (
            <div
              onDrop={(e) => handleDrop(e, state)}
              onDragOver={(e) => e.preventDefault()}
              key={indx}
              className="w-80 bg-gray-300 p-5"
            >
              <h1 className="text-2xl font-bold text-center">{state}</h1>
              {data[state].map((item) => (
                <div
                  draggable
                  onDragStart={(e) => handleDragStart(e, state, item)}
                  onDragEnd={(e) => {
                    handleDragEnd(e);
                  }}
                  key={item.id}
                  className={`p-2 my-2 cursor-grab ${state==="Todo" ? "bg-blue-500" : "bg-green-500"} ${state==="Completed"?"bg-red-600":""}`}
                >
                  <h2 className="text-xl">{item.task}</h2>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DragAndDrop;
