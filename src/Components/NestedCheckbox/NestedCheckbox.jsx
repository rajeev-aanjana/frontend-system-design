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
        name: "Parent-3",
        children: [
          {
            id: 7,
            name: "Child-4",
          },
          {
            id: 8,
            name: "Parent-4",
            children: [{ id: 9, name: "Child-5" }],
          },
        ],
      },
    ],
  },
  {
    id: 10,
    name: "Parent-5",
    children: [
      {
        id: 11,
        name: "Child-6",
      },
      {
        id: 12,
        name: "Child-7",
      },
    ],
  },
  {
    id: 13,
    name: "Parent-6",
  },
];

const Checkbox = ({ checkboxesData, checkedState, setCheckedState }) => {
  const handleChange = (isChecked, node) => {
    setCheckedState((prev) => {
      const newState = { ...prev, [node.id]: isChecked };

      /* Logic for checked all child if parent is checked */

      const updateChild = (node) => {
        node.children?.forEach((child) => {
          newState[child.id] = isChecked;
          if (child?.children) {
            updateChild(child);
          }
        });
      };
      updateChild(node);

      /* Logic for checked parent if all Child was checked */

      const verifyChecked = (node) => {
        if (!node.children) return newState[node.id] || false;

        const isAllChecked = node.children.every((child) =>
          verifyChecked(child),
        );

        newState[node.id] = isAllChecked;

        return isAllChecked;
      };

      CHECKBOX_DATA.forEach((node) => verifyChecked(node));

      return newState;
    });
  };

  return (
    <div>
      {checkboxesData.map((node) => (
        <div className="px-5" key={node.id}>
          <input
            checked={checkedState[node.id] || false}
            onChange={(e) => handleChange(e.target.checked, node)}
            type="checkbox"
            className="size-4 cursor-pointer"
          />
          <span className="px-2">{node.name}</span>
          {node?.children && (
            <Checkbox
              checkboxesData={node.children}
              checkedState={checkedState}
              setCheckedState={setCheckedState}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const NestedCheckbox = () => {
  const [checkedState, setCheckedState] = useState({});
  return (
    <div className="p-10">
      <Checkbox
        checkboxesData={CHECKBOX_DATA}
        checkedState={checkedState}
        setCheckedState={setCheckedState}
      />
    </div>
  );
};

export default NestedCheckbox;
