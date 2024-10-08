"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  ChangeEvent,
} from "react";

function Passgen() {
  const [Length, setLength] = useState<number>(8);
  const [Numberallowed, setNumberallowed] = useState<boolean>(false);
  const [Charallowed, setCharallowed] = useState<boolean>(false);
  const [Password, setPassword] = useState("");

  const Passwordgen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (Numberallowed) {
      str += "0123456789";
    }
    if (Charallowed) {
      str += "#%&$~`^!*";
    }
    for (let i = 1; i <= Length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [Length, Numberallowed, Charallowed, setPassword]);

  const passRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    Passwordgen();
  }, [Length, Numberallowed, Charallowed]);

  const handleLengthChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLength(Number(e.target.value));
  };

  const copyClipboard = ()=>{
    passRef.current?.select()
    window.navigator.clipboard.writeText(Password)
  }

  return (
    <div className="text-white overflow-hidden w-full mx-auto mt-32 rounded-lg h-36 bg-green-400 max-w-md">
      <div className="flex bg-white">
        <input
          type="text"
          value={Password}
          placeholder="Pssoword"
          readOnly
          className="w-full text-black text-lg"
          ref={passRef}
        />
        <button onClick={copyClipboard} className="bg-green-600 text-black font-medium h-11 w-32  ">
          COPY
        </button>
      </div>
      <div className="mt-8 flex items-center gap-2 text-black">
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={6}
            max={50}
            value={Length}
            onChange={handleLengthChange}
            className="cursor-pointer"
          />
          <label>Length:{Length}</label>
        </div>

        <div className="gap-2 flex">
          <input
            type="checkbox"
            defaultChecked={Numberallowed}
            onChange={() => {
              setNumberallowed((prev) => !prev);
            }}
          />
          <label>Number</label>
        </div>

        <div className="gap-2 flex">
          <input
            type="checkbox"
            defaultChecked={Charallowed}
            onChange={() => {
              setCharallowed((prev) => !prev);
            }}
          />
          <label>Character</label>
        </div>
      </div>
    </div>
  );
}

export default Passgen;
