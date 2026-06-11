// import React, { useEffect, useState } from "react";
// import Products from "./Products";

// function Pagination() {
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
// const [totalProducts, setTotalProducts] = useState(0)

//   const PAGE_SIZE = 10;

//   const fetchData = async (page) => {
//      const skip = page* PAGE_SIZE;
//     try {
//       const res = await fetch(`https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`);
//       const json = await res.json();
//       setData(json.products);
//       setTotalProducts(json.total)
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchData(currentPage);
//   }, [currentPage]);

//   const noPages = Math.ceil(totalProducts / PAGE_SIZE);

//   const handleClick = (n) => {
//     setCurrentPage(n);
//   };

//   const goBack = () => {
//     setCurrentPage((prev) => prev - 1);
//   };
//   const goForward = () => {
//     setCurrentPage((prev) => prev + 1);
//   };
//   return (
//     <>
//       <div>
//         <h1 className="text-4xl text-center m-5 ">Pagination Website</h1>
//         <div className="text-center m-2">
//           <button
//             disabled={currentPage === 0}
//             onClick={goBack}
//             className="p-2 border cursor-pointer"
//           >
//             ◀️
//           </button>
//           {[
//             ...Array(noPages)
//               .keys()
//               .map((num) => (
//                 <button
//                   onClick={() => handleClick(num)}
//                   className={`p-2 border m-0.5 cursor-pointer ${
//                     num === currentPage ? "bg-blue-600 text-white" : ""
//                   }`}
//                   key={num}
//                 >
//                   {num}
//                 </button>
//               )),
//           ]}
//           <button
//             disabled={currentPage === noPages - 1}
//             onClick={goForward}
//             className="p-2 border cursor-pointer"
//           >
//             ▶️
//           </button>
//         </div>
//         <div className="flex flex-wrap justify-center">
//           {data.map((item) => (
//             <Products key={item.id} title={item.title} image={item.thumbnail} />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Pagination;

import React, { useEffect, useState } from "react";

function Pagination() {
  const [data, setData] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const PAGE_SIZE = 16;

  const fetchData = async (page) => {
    const skip = page * PAGE_SIZE;
    const res = await fetch(
      `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`,
    );
    const json = await res.json();
    setData(json.products);
    setTotalProducts(json.total);
  };

  const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);

  useEffect(() => {
    const timer = fetchData(currentPage);
  }, [currentPage]);

  const handleClick = (num) => {
    setCurrentPage(num);
  };

  const goback = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const goforward = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className=" ml-20 text-center">
      <h1 className="text-4xl m-10">Pagination</h1>
      <button
        className="border m-2 p-2 hover:bg-amber-200 cursor-pointer"
        onClick={goback}
        disabled={currentPage===0}
      >
        ◀️
      </button>
      {[
        ...Array(noOfPages)
          .keys()
          .map((num) => (
            <button
              className={`border m-2 p-2 hover:bg-amber-200 cursor-pointer ${currentPage===num ? 'bg-blue-700 text-white' :''}`}
              key={num}
              onClick={() => handleClick(num)}
            >
              {num}
            </button>
          )),
      ]}
      <button
      disabled={currentPage === noOfPages-1}
        className="border m-2 p-2 hover:bg-amber-200 cursor-pointer"
        onClick={goforward}
      >
        ▶️
      </button>

      <div className="flex flex-wrap ">
        {data.map((item) => (
          <div className="border m-2 p-2" key={item.id}>
            <h1>{item.title}</h1>
            <img src={item.thumbnail} alt={item.title} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pagination;

// import React, { useEffect, useState } from "react";

// function Pagination() {
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);

//   const PAGE_SIZE = 15;

//   const fetchData = async () => {
//     const res = await fetch(`https://dummyjson.com/products?limit=500`);
//     const json = await res.json();
//     setData(json.products);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const start = currentPage * PAGE_SIZE;
//   const end = start + PAGE_SIZE;
//   const totalProducts = data.length;
//   const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);

//   function handleNext(currPage) {
//     setCurrentPage(currPage);
//   }

//   function goBack() {
//     setCurrentPage((prev) => prev - 1);
//   }

//   function goForward() {
//     setCurrentPage((prev) => prev + 1);
//   }

//   return (
//     <>
//       <div>
//         <h1 className="text-center text-4xl m-10">Pagination</h1>
//         <div className="text-center">
//           <button
//             disabled={currentPage === 0}
//             onClick={goBack}
//             className="p-2 border m-2 cursor-pointer"
//           >
//             ◀️
//           </button>
//           {[
//             ...Array(noOfPages)
//               .keys()
//               .map((num) => (
//                 <button
//                   onClick={() => handleNext(num)}
//                   className={`p-2 border m-2 cursor-pointer ${num === currentPage ? "bg-blue-500 text-white" : ""}`}
//                   key={num}
//                 >
//                   {num+1}
//                 </button>
//               )),
//           ]}
//           <button
//             disabled={currentPage === noOfPages - 1}
//             onClick={goForward}
//             className="p-2 border m-2 cursor-pointer"
//           >
//             ▶️
//           </button>
//         </div>
//         <div className="flex flex-wrap justify-center">
//           {data.slice(start, end).map((item) => (
//             <div className="border m-2 p-2 w-100" key={item.id}>
//               <h1>{item.title}</h1>
//               <img
//                 className="w-80 h-80"
//                 src={item.thumbnail}
//                 alt={item.title}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Pagination;
