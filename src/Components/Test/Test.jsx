import React, { useCallback, useEffect, useRef, useState } from "react";

const Test = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  const loadRef = useRef(null);
  const loadingRef = useRef(false)
  const LIMIT = 20;
  

  const fetchData = useCallback(async () => {
    if(loadingRef.current) return
    loadingRef.current=true
    await new Promise((resolve) => setTimeout(resolve, 500));
    const skip = page  * LIMIT;
    const res = await fetch(`https://dummyjson.com/posts?limit=${LIMIT}&skip=${skip}`);
    const json = await res.json();
    setData((prev) => [...prev, ...json?.posts]);
    loadingRef.current=false
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    const obeserver = new IntersectionObserver(
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
    if (loadRef.current) {
      obeserver.observe(loadRef.current);
    }

    return () => obeserver.disconnect();
  }, []);

  return (
    <div className="p-10">
      <div className="p-10">
        <div className="grid grid-cols-4 gap-10 ">
          {data.map((item) => (
            <div key={item.id} className="border rounded-2xl p-5 ">
              <div>
                <span>{item.id}</span>
                <h1 className="text-xl py-2">{item.title}</h1>
                <p className="line-clamp-5">{item.body}</p>
                <div className="mt-4 flex gap-3 text-center">
                  {item?.tags.map((t) => (
                    <span className="p-1 w-50 border rounded-3xl">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex justify-between py-5">
                <span>
                  {"❤️"}
                  {item?.reactions?.likes}
                </span>
                <span>
                  {"👀"}
                  {item.views}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div ref={loadRef}></div>
       {loadingRef.current ? <p className="">Loading....</p> : ''}
    </div>
  );
};

export default Test;
