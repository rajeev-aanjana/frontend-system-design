import React, { useEffect, useRef, useState } from "react";

const OTP_SIZE = 6;

const OtpInput = () => {
  const [otpInput, setOtpInput] = useState(new Array(OTP_SIZE).fill(""));
  const OTPRef = useRef([]);

  useEffect(() => {
    OTPRef.current[0].focus();
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!value.trim() || isNaN(value)) return;

    const newArr = [...otpInput];
    newArr[index] = value.slice(-1);

    setOtpInput(newArr);
    value && OTPRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    const key = e.key;

    if (key === "Backspace") {
      const newOtp = [...otpInput];

      if (newOtp[index]) {
        newOtp[index] = "";
        setOtpInput(newOtp);
      } else {
        OTPRef.current[index - 1]?.focus();
      }
    }

    if (key === "ArrowRight") {
      OTPRef.current[index + 1]?.focus();
      return;
    }

    if (key === "ArrowLeft") {
      OTPRef.current[index - 1]?.focus();
      return;
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    if (isNaN(pasteData)) return;

    const newOTP = [...otpInput];
    pasteData.split("").forEach((element, index) => {
      if (index < OTP_SIZE) {
        newOTP[index] = element;
      }
    });
    setOtpInput(newOTP);

    OTPRef.current[Math.min(pasteData.length, OTP_SIZE - 1)]?.focus();
  };

  return (
    <div className="text-center p-5">
      <h1 className="text-3xl font-bold">OTP Input</h1>
      <div className="my-5">
        {otpInput.map((item, index) => (
          <input
            value={item}
            ref={(input) => (OTPRef.current[index] = input)}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            key={index}
            type="text"
            // maxLength={1}
            // inputMode="numeric"
            className="border w-12 p-3 m-1"
          />
        ))}
      </div>
      
      <h2 className="mt-5 text-xl">
        OTP: <span className="font-bold">{otpInput.join("")}</span>
      </h2>
    </div>
  );
};

export default OtpInput;
