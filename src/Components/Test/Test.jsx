import React, { useState } from "react";

const Profile = ({ setCurrentPage }) => {
  return (
    <>
      <div className="">

        <div className="p-5 grid grid-cols-3 gap-7 w-180 ">
          <div>
            <label>Name:</label>
            <input
              type="text"
              className="border p-1 mx-2"
              placeholder="your name"
            />
          </div>
          <div>
            <label>Designation:</label>
            <input
              type="text"
              className="border p-1 mx-2"
              placeholder="your designation"
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              className="border p-1 mx-2"
              placeholder="your email"
            />
          </div>
          <div>
            <label>Mobile:</label>
            <input
              type="text"
              className="border p-1 mx-2"
              placeholder="your contact"
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              className="border p-1 mx-2"
              placeholder="your address"
            />
          </div>
        </div>
      </div>
    </>
  );
};

const Interest = ({ setCurrentPage }) => {
  return (
    <>
      <div className="">
        <div className="p-5 grid grid-cols-3 gap-7 w-240 ">
          <div>
            <label>Skills:</label>
            <input
              type="text"
              className="border p-1 mx-2"
              placeholder="write your skills"
            />
          </div>
          <div>
            <label>Hobbies:</label>
            <input
              type="text"
              className="border p-1 mx-2"
              placeholder="your hobbies"
            />
          </div>
          <div>
            <label>Night/Day shift:</label>
            <input
              type="checkbox"
              className="border p-1 mx-2"
            /> <span>Night</span>
            <input
              type="checkbox"
              className="border p-1 mx-2"
            /> <span>Day</span>
          </div>
        </div>
      </div>
    </>
  );
};

const Settings = ({ setCurrentPage }) => {
  return (
    <>
      <div className="">
        <div className="p-5 grid grid-cols-3 gap-7 w-180">
          <div>
            <label>Name:</label>
            <input
              type="text"
              className="border p-1 mx-2"
              placeholder="your name"
            />
          </div>
          <div>
            <label>Designation:</label>
            <input
              type="text"
              className="border p-1 mx-2"
              placeholder="your designation"
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              className="border p-1 mx-2"
              placeholder="your email"
            />
          </div>
          <div>
            <label>Mobile:</label>
            <input
              type="text"
              className="border p-1 mx-2"
              placeholder="your contact"
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              className="border p-1 mx-2"
              placeholder="your address"
            />
          </div>
        </div>
      </div>
    </>
  );
};

const Test = () => {
  const tabs = ["Profile", "Interest", "Settings"];
  const [currentPage, setCurrentPage] = useState(tabs);
  return (
    <div className="border m-10">
      <div className="flex gap-10 w-360">
        {tabs.map(tab=>
          <button className={`border cursor-pointer w-60 p-2 ${currentPage===tab ? "bg-blue-600 text-white font-bold" : ""}`} key={tab} onClick={()=> setCurrentPage(tab)}>{tab}</button>
        )}
      </div>
      <div>
        {currentPage=== "Profile" && <Profile />}
        {currentPage=== "Interest" && <Interest />}
        {currentPage=== "Settings" && <Settings />}
      </div>
    </div>
  );
};

export default Test;
