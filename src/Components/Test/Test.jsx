import React, { useState, useRef } from "react";

const FOLDER_STRUCTURE = [
  {
    id: "1",
    name: "public",
    isFolder: true,
    children: [
      {
        id: "2",
        name: "vite.svg",
        isFolder: false,
      },
    ],
  },
  {
    id: "3",
    name: "src",
    isFolder: true,
    children: [
      {
        id: "4",
        name: "components",
        isFolder: true,
        children: [
          {
            id: "5",
            name: "Card.jsx",
            isFolder: false,
          },
          {
            id: "6",
            name: "Header.jsx",
            isFolder: false,
          },
          {
            id: "7",
            name: "Nav.jsx",
            isFolder: false,
          },
        ],
      },
      {
        id: "8",
        name: "pages",
        isFolder: true,
        children: [
          {
            id: "9",
            name: "Home.jsx",
            isFolder: false,
          },
          {
            id: "10",
            name: "Main.jsx",
            isFolder: false,
          },
          {
            id: "11",
            name: "Footer.jsx",
            isFolder: false,
          },
          {
            id: "12",
            name: "Index",
            isFolder: true,
            children: [
              {
                id: "13",
                name: "Index.jsx",
                isFolder: false,
              },
              {
                id: "16",
                name: "index.css",
                isFolder: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "14",
    name: "App.jsx",
    isFolder: false,
  },
  {
    id: "15",
    name: "app.css",
    isFolder: false,
  },
];

const List = ({ folderData, setData }) => {
  const [isExpandable, setIsExpandable] = useState({});
  const [input, setInput] = useState("");
  const [addingFolderId, setAddingFolderId] = useState(null);

  const deleteNode = (nodes, id) => {
    return nodes
      .filter((node) => node.id !== id)
      .map((node) => {
        if(node.children){
            return {...node, children : deleteNode(node.children, id)}
        }
        return node
      });
  };

  const deleteFolder = (id) => {
    setData((prev) => deleteNode(prev, id));
  };

  const addNewNode = (nodes, id, newNode) => {
    return nodes.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          children: [...node.children, newNode],
        };
      }
      if (node.children) {
        return {
          ...node,
          children: node.children
            ? addNewNode(node.children, id, newNode)
            : undefined,
        };
      }
      return node
    });
  };

  const handleAdd = (e, id) => {
    if (e.key !== "Enter" || !input.trim()) return;

    const newNode = {
      id: Date.now(),
      name: input.trim(),
      isFolder: !input.includes("."),
      children: !input.includes(".") ? [] : undefined,
    };

    setData((prev) => addNewNode(prev, id, newNode));
    setInput("");
    setAddingFolderId(null);
  };

  return (
    <div className="w-70 px-5 py-1 relative">
      {folderData.map((item) => (
        <div key={item.id}>
          <span
            onClick={() =>
              setIsExpandable((prev) => ({
                ...prev,
                [item.name]: !prev[item.name],
              }))
            }
            className="cursor-pointer mx-2"
          >
            {item.isFolder && (isExpandable?.[item.name] ? "-" : "+")}
          </span>
          <span>{item.name}</span>
          {item.isFolder && (
            <span className="pl-2 text-sm">
              <button
                onClick={() => setAddingFolderId(item.id)}
                className="cursor-pointer"
              >
                ➕
              </button>
            </span>
          )}
          <span className="pl-2 text-sm">
            <button className="cursor-pointer">✏️</button>
            <button
              className="cursor-pointer"
              onClick={() => deleteFolder(item.id)}
            >
              🗑️
            </button>
          </span>
          {addingFolderId === item.id && (
            <div>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                onKeyDown={(e) => handleAdd(e, item.id)}
                className="border-white bg-gray-700"
              />
              <span
                onClick={() => setAddingFolderId(null)}
                className="mx-2 cursor-pointer"
              >
                X
              </span>
            </div>
          )}

          {isExpandable?.[item.name] && item?.children && (
            <List folderData={item.children} setData={setData} />
          )}
        </div>
      ))}
    </div>
  );
};

const Test = () => {
  const [data, setData] = useState(FOLDER_STRUCTURE);
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  return (
    <div className="p-10 bg-black text-white">
      <h1 className="font-bold text-xl">
        <span
          className="px-2 cursor-pointer"
          onClick={() => setIsFolderOpen((prev) => !prev)}
        >
          {isFolderOpen ? "-" : "+"}
        </span>
        Folder
      </h1>
      {isFolderOpen && <List folderData={data} setData={setData} />}
    </div>
  );
};

export default Test;
