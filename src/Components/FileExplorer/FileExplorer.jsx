import React, { useState } from "react";

const FOLDER_STRUCTURE = [
  {
    id: 1,
    name: "public",
    isFolder: true,
    children: [{ id: 2, name: "vite.svg", isFolder: false }],
  },
  {
    id: 16,
    name: "src",
    isFolder: true,
    children: [
      {
        id: 3,
        name: "components",
        isFolder: true,
        children: [
          { id: 4, name: "Accordion.jsx", isFolder: false },
          { id: 5, name: "Carousel.jsx", isFolder: false },
          { id: 6, name: "Search.jsx", isFolder: false },
        ],
      },
      {
        id: 7,
        name: "pages",
        isFolder: true,
        children: [
          { id: 8, name: "Home.jsx", isFolder: false },
          { id: 9, name: "About.jsx", isFolder: false },
          { id: 10, name: "Contact.jsx", isFolder: false },
          {
            id: 11,
            name: "index",
            isFolder: true,
            children: [
              { id: 12, name: "Index.jsx", isFolder: false },
              { id: 13, name: "index.css", isFolder: false },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 14,
    name: "App.jsx",
    isFolder: false,
  },
  {
    id: 15,
    name: "app.css",
    isFolder: false,
  },
];

const List = ({ folderData, setData }) => {
  const [isExpandable, setIsExpandable] = useState({});
  const [addingId, setAddingId] = useState(null);
  const [input, setInput] = useState("");

  // ---------------- ADD ----------------

  const addNewNode = (nodes, id, newNode) => {
    return nodes.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          children: [...(node.children || []), newNode],
        };
      }

      return {
        ...node,
        children: node.children
          ? addNewNode(node.children, id, newNode)
          : undefined,
      };
    });
  };

  const handleAddFolder = (e, id) => {
    if (e.key !== "Enter" || !input.trim()) return;

    const newNode = {
      id: Date.now(),
      name: input.trim(),
      isFolder: !input.includes("."),
      children: !input.includes(".") ? [] : undefined,
    };

    setData((prev) => addNewNode(prev, id, newNode));

    setInput("");
    setAddingId(null);
  };

  // ---------------- DELETE ----------------

  const deleteNode = (nodes, id) => {
    return nodes
      .filter((node) => node.id !== id)
      .map((node) => ({
        ...node,
        children: node.children ? deleteNode(node.children, id) : undefined,
      }));
  };

  const handleDelete = (id) => {
    setData((prev) => deleteNode(prev, id));
  };

  return (
    <div className="px-7 mt-2">
      {folderData.map((node) => (
        <div key={node.id}>
          {/* Expand Collapse */}

          <span
            className="cursor-pointer"
            onClick={() =>
              setIsExpandable((prev) => ({
                ...prev,
                [node.id]: !prev[node.id],
              }))
            }
          >
            {node.isFolder ? (isExpandable[node.id] ? "- " : "+ ") : ""}
          </span>

          <span>{node.name}</span>

          <span className="px-2 text-sm">
            {node.isFolder && (
              <button
                className="cursor-pointer"
                onClick={() => {
                  setAddingId(node.id);

                  // Auto expand while adding
                  setIsExpandable((prev) => ({
                    ...prev,
                    [node.id]: true,
                  }));
                }}
              >
                ➕
              </button>
            )}

            <button
              className="cursor-pointer"
              onClick={() => handleDelete(node.id)}
            >
              🗑️
            </button>
          </span>

          {addingId === node.id && (
            <div className="my-1">
              <input
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => handleAddFolder(e, node.id)}
                className="bg-gray-500 px-2 py-1"
              />

              <span
                className="cursor-pointer mx-2"
                onClick={() => {
                  setAddingId(null);
                  setInput("");
                }}
              >
                ❌
              </span>
            </div>
          )}

          {isExpandable[node.id] && node.children && (
            <List folderData={node.children} setData={setData} />
          )}
        </div>
      ))}
    </div>
  );
};

const FileExplorer = () => {
  const [data, setData] = useState(FOLDER_STRUCTURE);
  const [isFolderOpen, setIsFolderOpen] = useState(false);

  return (
    <div className="bg-black text-white p-10">
      <h1 className="text-xl font-bold">
        <span
          className="cursor-pointer mr-2"
          onClick={() => setIsFolderOpen((prev) => !prev)}
        >
          {isFolderOpen ? "-" : "+"}
        </span>
        Folders
      </h1>

      {isFolderOpen && <List folderData={data} setData={setData} />}
    </div>
  );
};

export default FileExplorer;
