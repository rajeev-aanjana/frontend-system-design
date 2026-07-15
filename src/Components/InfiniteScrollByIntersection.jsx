import React, { useCallback, useEffect, useRef, useState } from "react";

const InfiniteScrollByIntersection = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  const PAGE_SIZE = 21;
  const scrollRef = useRef(null);
  const loadingRef = useRef(false);

  const fetchData = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    await new Promise((resolve) => setTimeout(resolve, 400));
    const skip = page * PAGE_SIZE;
    const res = await fetch(
      `https://dummyjson.com/products?&limit=${PAGE_SIZE}&skip=${skip}`,
    );
    const json = await res.json();
    setData((prev) => [...prev, ...json?.products]);
    loadingRef.current = false;
  }, [page]);

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
        rootMargin: "100px",
      },
    );
    if (scrollRef.current) {
      observer.observe(scrollRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="p-10">
        <div className="grid grid-cols-3 gap-10">
          {data.map((item) => (
            <div className="w-100 border p-5" key={item.id}>
              <h1 className="font-bold">{item.id}</h1>
              <h1 className="text-xl font-bold">{item.title}</h1>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
        <div ref={scrollRef}></div>
      </div>
      {loadingRef.current ? (
        <h1 className="text-center text-xl font-bold">Loading...</h1>
      ) : (
        ""
      )}
    </>
  );
};

export default InfiniteScrollByIntersection;
