import React, { Children, useEffect, useState } from "react";

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
    ],
  },
  {
    id: 6,
    name: "Parent-3",
    children: [
      {
        id: 7,
        name: "Parent-4",
        children: [
          {
            id: 133,
            name: "Extra Child",
          },
          {
            id: 8,
            name: "Parent-5",
            children: [
              { id: 9, name: "Child-4" },
              { id: 10, name: "Child-5" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 12,
    name: "Parent-6",
    children: [
      {
        id: 11,
        name: "Child-7",
      },
    ],
  },
];

const CheckBox = ({ checkboxData, checked, setChecked }) => {
  const handleChange = (isChecked, node) => {
    setChecked((prev) => {
      const newState = { ...prev, [node.id]: isChecked };

      const updateChild = (node) => {
        node.children?.forEach((child) => {
          newState[child.id] = isChecked;
          if (child?.children) {
            updateChild(child);
          }
        });
      };

      updateChild(node);

      const updateParent = (node) => {
        if (!node.children) return newState[node.id] || false;

        const verifyAll = node.children.every((child) => updateParent(child));
        newState[node.id] = verifyAll;
        return verifyAll;
      };

      CHECKBOX_DATA.forEach((node) => updateParent(node));

      // const verifyChecked = (node) => {
      //   if (!node.children) return newState[node.id] || false;

      //   const isAllChecked = node.children.every((child) =>
      //     verifyChecked(child),
      //   );

      //   newState[node.id] = isAllChecked;

      //   return isAllChecked;
      // };

      // CHECKBOX_DATA.forEach((node) => verifyChecked(node));
      return newState;
    });
  };
  return (
    <div>
      {checkboxData.map((node) => (
        <div className="px-4" key={node.id}>
          <input
            className="cursor-pointer"
            type="checkbox"
            checked={checked[node.id] || false}
            onChange={(e) => handleChange(e.target.checked, node)}
          />
          <span className="px-2">{node.name}</span>
          {node?.children && (
            <CheckBox
              checkboxData={node.children}
              checked={checked}
              setChecked={setChecked}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const Test = () => {
  const [checked, setChecked] = useState({});
  return (
    <div className="p-10">
      <CheckBox
        checkboxData={CHECKBOX_DATA}
        checked={checked}
        setChecked={setChecked}
      />
    </div>
  );
};

export default Test;
