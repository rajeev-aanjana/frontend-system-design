import React, { useEffect, useState } from "react";
import "./search.css";

function AutocompleteSearch() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [focus, setFocus] = useState(false);
  const [cache, setCache] = useState({});

  const fetchData = async () => {
    if (!input.trim()) {
      setData([]);
      return;
    }

    if (cache[input]) {
      setData(cache[input]);
      return;
    }

    try {
      const res = await fetch(
        `https://dummyjson.com/recipes/search?q=${input}`
      );
      const json = await res.json();

      setData(json?.recipes || []);
      setCache((prev) => ({
        ...prev,
        [input]: json?.recipes || [],
      }));
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchData, 300);
    return () => clearTimeout(timer);
  }, [input]);

  const selectSearch = (value) => {
    setInput(value);
    setFocus(false);
  };

  return (
    <div className="container">
      <div className="search-wrapper">
        <input
          value={input}
          type="text"
          placeholder="search here..."
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={()=> setFocus(false)}
        />
      </div>

      {focus && data.length > 0 && (
        <div
          className="search-result"
          onMouseDown={(e) => e.preventDefault()}
        >
          {data.map((item) => (
            <span
              key={item.id}
              onClick={() => selectSearch(item.name)}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default AutocompleteSearch;

