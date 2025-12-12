import { useCallback, useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [length, setLength] = useState(8);
  const passRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "0123456789";
    if (character) str += "!@#$%^&*()_+[]{}|;:,.<>?";

    for (let i = 0; i < length; i++) {
      const charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex); // Use charAt, not charCodeAt
    }

    setPassword(pass);
  }, [length, number, character]);

  // Generate password when dependencies change
  useEffect(() => {
    passwordGenerator();
  }, [length, number, character, passwordGenerator]);

  // Copy to clipboard
  const copyToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    passRef.current?.select();
    passRef.current?.setSelectionRange(0,51);
    alert("passwrod copied");
  },[password]);

  return (
    <>
      <div className="bg-blue-300 mx-auto mt-20 w-[500px] p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">
          Password Generator
        </h1>

        <div className="flex items-center bg-white rounded-lg px-4 py-3 mb-6 shadow">
          <input
            className="flex-1 outline-none text-lg text-yellow-500"
            type="text"
            value={password}
            ref={passRef}
            
            
            readOnly
          />
          <button
            onClick={copyToClipboard}
            className="ml-3 text-white font-semibold bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg transition"
          >
            Copy
          </button>
        </div>

        <div className="space-y-4 text-white">
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="flex-1 cursor-pointer"
            />
            <label>Length: {length}</label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="number"
              checked={number}
              onChange={(e) => setNumber(e.target.checked)}
            />
            <label htmlFor="number">Include Numbers</label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="character"
              checked={character}
              onChange={(e) => setCharacter(e.target.checked)}
            />
            <label htmlFor="character">Include Special Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;