import React, { useEffect, useState } from "react";

const Accordion = () => {
  const [data, setData] = useState([]);
  const [isExpand, setIsExpand] = useState(null);

  const fetchData = async () => {
    const res = await fetch(`https://dummyjson.com/recipes`);
    const json = await res.json();
    setData(json?.recipes);
  };


  useEffect(() => {
    fetchData();
  }, []);

  const showDetails = (id) => {
    // console.log(isExpand, id)
    setIsExpand(isExpand === id ? null : id);
  };
  return (
    <div className="text-center p-12">
      <h1 className="font-bold text-3xl mb-5">Accordion Project</h1>

      {data.map((item) => (
        <div key={item.id} className="p-2 m-auto w-9/12">
          <div
            className="flex justify-between p-4 bg-orange-300 shadow-lg cursor-pointer"
            onClick={()=>showDetails(item.id)}
          >
            <span>{item.id}.</span>
            <span className="font-bold underline hover:text-amber-100 ">
              {item.name}
            </span>
            <span>⬇️</span>
          </div>
          {isExpand === item.id && (
            <div className="text-left py-4 bg-amber-50 shadow-xl">
              <h3 className="font-bold bg-orange-200 p-2 w-12/12">
                Ingredients
              </h3>
              <span className="px-10 mt-2 block">{item.ingredients.join(", ")}</span>

              <div className="py-5">
                <h3 className="font-bold bg-orange-200 p-2 w-12/12">
                  Instructions
                </h3>
                <ul className="px-10 mt-5">
                  {item.instructions.map((inst) => (
                    <li className="list-disc" key={inst}>
                      {inst}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        </div>
      ))}
    </div>
  );
};

export default Accordion;
