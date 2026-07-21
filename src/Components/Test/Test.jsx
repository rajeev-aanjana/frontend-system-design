// import React, { useEffect, useState } from "react";

// const Test = () => {
//   const [bar, setBar] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setBar((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           return prev;
//         }
//         return prev + 1;
//       });
//     }, 50);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="flex w-125 justify-between relative top-10 left-10">
//       <div className=" w-100 border overflow-hidden rounded-2xl">
//         <div
//           className={`w-full bg-green-700 text-right text-white transition-all duration-100`}
//           style={{ transform: `translateX(${bar - 100}%)` }}
//         >
//           {bar}%
//         </div>
//       </div>
//       <span
//         className={`font-bold ${bar < 100 ? "text-red-600" : " text-green-700"}`}
//       >
//         {bar < 100 ? "Please Wait" : "Completed!"}
//       </span>
//     </div>
//   );
// };

// export default Test;

import React, { useEffect, useRef, useState } from "react";

const Test = () => {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const progressRef = useRef(null);
  useEffect(() => {
    if (isRunning) {
      progressRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressRef.current);
            setIsRunning(false);
            return prev;
          }
          return prev + 1;
        });
      }, 75);
    }else{
      clearInterval(progressRef.current)
    }
    return () => clearInterval(progressRef.current);
  }, [isRunning]);
  return (
    <div className="flex justify-center items-center h-100">
      <div className="w-100 border rounded-2xl overflow-hidden">
        <div
          className={`text-white text-right p-0.5 bg-green-600 transition-all duration-75`}
          style={{ transform: `translateX(${progress - 100}%)` }}
        >
          {progress}%
        </div>
      </div>
      <span
        className={`mx-10 font-bold ${progress >= 100 ? "text-green-600" : "text-red-600"}`}
      >
        {progress >= 100 ? "Completed!" : "Please Wait.."}
      </span>
      <button
        className=" border px-5 py-2"
        onClick={() => setIsRunning((prev) => !prev)}
      >
        {isRunning ? "Stop" : "Start"}
      </button>
    </div>
  );
};

export default Test;
