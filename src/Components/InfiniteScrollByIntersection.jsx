import React, { useState, useEffect, useRef, useCallback } from 'react';
// import './style.css';

export default function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const LIMIT = 15;
  const loadRef = useRef(null);
  const loadingRef = useRef(false)

  const fetchData = useCallback(
    async () => {
      if(loadingRef.current) return
      loadingRef.current=true

      await new Promise((resolve) => setTimeout(resolve, 500));

      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${LIMIT}&_page=${
          page
        }`
      );
      const json = await res.json();
      setData((prev) => [...prev, ...json]);
      loadingRef.current = false;
  },[page])

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingRef.current) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 0,
        root: null,
        rootMargin: '100px',
      }
    );
    if (loadRef.current) {
      observer.observe(loadRef.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <>
      <div
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {data.map((item) => (
          <div
            style={{
              width: '300px',
              margin: '10px',
              padding: '5px',
              border: '1px solid black',
            }}
            key={item.id}
          >
            <span>{item.id}</span>
            <h3>{item.title}</h3>
            <h4>{item.body}</h4>
          </div>
        ))}
      </div>
      <div ref={loadRef}></div>
      {loadingRef.current ? <p>Loading....</p> : ''}
    </>
  );
}