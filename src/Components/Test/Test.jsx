import React, { Children, useState } from "react";

const CHECKBOX_DATA = [
  {
    id: 1,
    name: "Parent-1",
    children: [
      {
        id: 2,
        name: "Parent-2",
        children: [
          {
            id: 3,
            name: "Child-1",
          },
          {
            id: 4,
            name: "Child-2",
          },
          {
            id: 5,
            name: "Child-3",
          },
        ],
      },
      {
        id: 6,
        name: "Child-4",
      },
      {
        id: 7,
        name: "Child-5",
      },
    ],
  },

  {
    id: 8,
    name: "Parent-3",
    children: [
      {
        id: 9,
        name: "Child-6",
      },
      {
        id: 10,
        name: "Child-7",
      },
    ],
  },
  {
    id: 11,
    name: "Parent-4",
  },
];

const CheckBox = ({ checkBoxes, isChecked, setIsChecked }) => {
  const handleChecked = (checked, node) => {
    setIsChecked((prev) => {
      const newState = { ...prev, [node.id]: checked };

      const updateChild = (node) => {
        node.children?.forEach((child) => {
          newState[child.id] = checked;
          if (child?.children) {
            updateChild(child);
          }
        });
      };
      updateChild(node);

      const verifyAll = (node)=>{
        if(!node.children) return newState[node.id] || false
        const allChecked = node.children.every((child)=>verifyAll(child))
        newState[node.id] = allChecked
        return allChecked
      }
      CHECKBOX_DATA.forEach((node)=>verifyAll(node))

      return newState;
    });
  };
  return (
    <div>
      {checkBoxes.map((node) => (
        <div className="px-7 py-1" key={node.id}>
          <input
            className="size-4 cursor-pointer"
            type="checkbox"
            onChange={(e) => handleChecked(e.target.checked, node)}
            checked={isChecked[node.id] || false}
          />
          <span className="mx-2">{node.name}</span>
          {node.children && (
            <CheckBox
              checkBoxes={node.children}
              isChecked={isChecked}
              setIsChecked={setIsChecked}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const Test = () => {
  const [data, setData] = useState(CHECKBOX_DATA);
  const [isChecked, setIsChecked] = useState({});
  return (
    <div className="p-10 text-xl">
      <CheckBox
        checkBoxes={data}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
    </div>
  );
};

export default Test;


