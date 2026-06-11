import React, { useCallback, useEffect, useRef, useState } from "react";

function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isSpecialCharAllowed, setIsSpecialCharAllowed] = useState(false);

  const passRef = useRef(null)

  const generatePassword = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(isNumberAllowed) str += "0123456789";
    if(isSpecialCharAllowed) str += "!@#$%^&*()_+}{~`<>?:[]";
    for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random() * str.length)
        pass += str.charAt(char);    
    }
    setPassword(pass)
  },[length, isNumberAllowed, isSpecialCharAllowed])

  useEffect(()=>{
    generatePassword()
  },[length, isNumberAllowed, isSpecialCharAllowed, generatePassword])

  const copyPass = useCallback(()=>{
    passRef.current?.select()
     // passRef.current?.setSelectionRange(0,3)  //=> or kuch is tarah se hum ek perticular range tk select kr skte h 
    window.navigator.clipboard.writeText(password);
  },[password])

  return (
    <>
      <div className="w-full p-2 max-w-md mx-auto shadow-md rounded-lg px-5 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            className="outline-none w-full py-1 px-3 bg-white"
            value={password}
            ref={passRef}
            type="text"
            placeholder="password shows here....."
          />
          <button onClick={copyPass} className="bg-blue-700 text-white p-3 text-xl cursor-pointer">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              className="cursor-pointer"
              type="range"
              value={length}
              min={6}
              max={100}
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-cente gap-x-1">
            <input
              type="checkbox"
              defaultChecked={isNumberAllowed}
              id="isNumber"
              onChange={() => setIsNumberAllowed((prev)=>!prev)}
            />
            <label>Number</label>
          </div>
          <div className="flex items-cente gap-x-1">
            <input
              type="checkbox"
              defaultChecked={isSpecialCharAllowed}
              id="isChar"
              onChange={()=> setIsSpecialCharAllowed((prev) => !prev)}
            />
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default PasswordGenerator;
