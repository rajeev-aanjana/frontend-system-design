import React, { useEffect, useState } from "react";

function InfiniteScrollByEvent() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

// const didFetchRef = useRef(false)

  const THRESHOLD = 20;
  const LIMIT = 10;

  const fetchData = async () => {
    if (loading) return; // 🛑 guard

    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${LIMIT}&_page=${page}`
    );
    const json = await res.json();

    setData(prev => [...prev, ...json]);
    setPage(prev => prev + 1);

    setLoading(false);
  };

    useEffect(()=>{
        // if(didFetchRef.current) return
        // didFetchRef.current = true
        fetchData()
    },[])

  function handleScroll(e) {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const remainingHeight = scrollHeight - (scrollTop + clientHeight);

    if (remainingHeight < THRESHOLD && !loading) {
      fetchData();
    }
  }

  return (
    <div
      className="h-screen overflow-auto"
      onScroll={handleScroll}
    >
      {data.map(item => (
        <div className="border-b mt-3" key={item.id}>
          <h1>{item.id}</h1>
          <h2>{item.title}</h2>
          <p>{item.body}</p>
        </div>
      ))}

      {loading && (
        <p className="text-center p-4">Loading...</p>
      )}
    </div>
  );
}

export default InfiniteScrollByEvent;
