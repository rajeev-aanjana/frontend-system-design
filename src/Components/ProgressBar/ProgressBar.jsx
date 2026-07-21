import React, { useEffect, useRef, useState } from "react";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  /* Start and Stop Logic of progress Bar if interviewer ask to build in any case */

  //   const [isRunning, setIsRunning] = useState(true);
  //   const progressRef = useRef();

  //   useEffect(() => {
  //     if (isRunning) {
  //       progressRef.current = setInterval(() => {
  //         setProgress((prev) => {
  //           if (prev >= 100) {
  //             clearInterval(progressRef.current);
  //             setIsRunning(false);
  //             return prev;
  //           }
  //           return prev + 1;
  //         });
  //       }, 75);
  //     } else {
  //       clearInterval(progressRef.current);
  //     }
  //     return () => clearInterval(progressRef.current);
  //   }, [isRunning]);

  /* First Build this without start and stop button then if interviewer ask to build the functionality then go for that */

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 75);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-100 border rounded-2xl overflow-hidden">
        <div
          className="bg-green-600 text-white transition-all text-right p-0.5"
          style={{ transform: `translateX(${progress - 100}%)` }}
        >
          {progress}%{" "}
        </div>
      </div>
      <span
        className={`mx-3 font-bold ${progress >= 100 ? "text-green-600" : "text-red-600"}`}
      >
        {progress >= 100 ? "Completed" : "Please wait"}
      </span>

      {/* Start and Stop logic */}

      {/* <button
        className="border px-2 rounded-2xl cursor-pointer"
        onClick={() => setIsRunning((prev) => !prev)}
      >
        {isRunning ? "Stop" : "Start"}
      </button> */}
    </div>
  );
};

export default ProgressBar;
