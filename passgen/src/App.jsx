import React, { useCallback, useEffect, useState } from "react";
import GitHubIcon from '@mui/icons-material/GitHub';

const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [btnText, setBtnText] = useState("Copy")

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-=+~";
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyClip = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    setBtnText("Copied")
    setTimeout(() => {
      setBtnText("Copy")
    }, 2000);
  }, [password]);
  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-cover bg-slate-700 font-sans" >
          <h1 className="text-white text-center text-3xl">Random Password Generator</h1>
        <div className="w-full max-w-md mx-auto px-4 my-8 text-white bg-gray-500  border-gray-400 border-2 rounded-lg p-9">
          <div className="flex shadow rounded-lg mb-4">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-5 rounded-tl-lg rounded-bl-lg text-black"
              placeholder="Password"
              readOnly
            />
            <button
              className="outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0 hover:bg-blue-700 rounded-r-lg"
              onClick={copyClip}
            >
              {btnText}
            </button>
          </div>
          <div className="flex text-sm gap-x-2">
            <div className="flex flex-col items-center gap-x-1">
              <input
                type="range"
                min={8}
                max={50}
                className="cursor-pointer w-56"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
                value={length}
              />
              <label htmlFor="">Length {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                className="cursor-pointer"
                defaultChecked={numberAllowed}
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                className="cursor-pointer"
                defaultChecked={charAllowed}
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="">Characters</label>
            </div>
          </div>
        </div>
        <a href="https://github.com/amanchoudhary9980" target="_blank" className="text-white text-xl hover:text-slate-300"><GitHubIcon/> / amanchoudhary9980</a>
      </div>
    </>
  );
};

export default App;
