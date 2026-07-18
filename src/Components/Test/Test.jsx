import React, { useEffect, useRef, useState } from "react";

const OTP_LIMIT = 6;

const Test = () => {
  const [otpInput, setOtpInput] = useState(new Array(OTP_LIMIT).fill(""));
  const otpRef = useRef([]);

  useEffect(() => {
    otpRef.current[0].focus();
  }, []);
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!value.trim() || isNaN(value)) return;
    const newArr = [...otpInput];
    const newValue = value.trim();
    newArr[index] = newValue.slice(-1);
    setOtpInput(newArr);
    newValue && otpRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    const key = e.key;
    if (key === "Backspace") {
      const newOTP = [...otpInput];
      if (newOTP[index]) {
        newOTP[index] = "";
        setOtpInput(newOTP);
      } else {
        otpRef.current[index - 1]?.focus();
      }
    }
    if(key === "ArrowLeft"){
      otpRef.current[index-1]?.focus()
      return
    }
    if(key === "ArrowRight"){
      otpRef.current[index+1]?.focus()
      return
    }
  };

  const handlePaste = (e)=>{
    e.preventDefault()
    const pasteData = e.clipboardData.getData("text")
    if(isNaN(pasteData)) return

    const newOTP = [...otpInput];

    pasteData.split("").forEach((digit,index) => {
      if(index < OTP_LIMIT){
        newOTP[index]=digit
      }
    });

    setOtpInput(newOTP)

    otpRef.current[Math.min(pasteData.length, OTP_LIMIT - 1)]?.focus();
  }

  return (
    <div className="p-5 text-center ">
      <h1 className="font-bold text-3xl my-5">OTP Input</h1>
      <div>
        {otpInput.map((item, index) => (
          <input
            key={index}
            ref={(input) => (otpRef.current[index] = input)}
            value={item}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={(e)=>handlePaste(e)}
            type="text"
            className="border p-2 w-12 m-1"
          />
        ))}
      </div>
    </div>
  );
};

export default Test;
