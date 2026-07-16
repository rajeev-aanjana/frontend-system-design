import React, { useEffect, useState } from "react";

const Test = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [focus, setFocus] = useState(false);

  const fetchData = async () => {
    console.log(input);
    const res = await fetch(`https://dummyjson.com/recipes/search?q=${input}`);
    const json = await res.json();
    setData(json?.recipes);
  };

  useEffect(() => {
    const timer = setTimeout(fetchData, 300);
    return () => clearTimeout(timer);
  }, [input]);

  const selectSearch = (item) => {
    setInput(item);
    setFocus(false)
  };
  return (
    <>
      <div className="text-center py-10">
        <div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="search here..."
            className="border w-100 p-2"
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
          />
          {focus && data.length > 0 && (
            <div className="h-100 overflow-auto w-100 border m-auto"
            onMouseDown={(e)=>e.preventDefault()}>
              {data.map((item) => (
                <div
                  key={item.id}
                  className="text-left p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => selectSearch(item.name)}
                >
                  <span className="">{item.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Test;
