import { useCallback, useEffect, useRef, useState } from 'react'


function App() {
  const [length, setLength] = useState(10);
  const [password, setPassword] = useState("");
  const [charAllowed, setCharAllowed] = useState(false);
  const [digAllowed, setDigAllowed] = useState(false);
  const passRef = useRef(null);

  const setGeneratePassword = useCallback(() => {
    let password_str = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (charAllowed) str += "!@#$%^&*(){}";
    if (digAllowed) str += "1234567890";

    for (let i = 0; i < length; i++) {
      password_str += str.charAt(Math.floor(Math.random() * str.length + 1));
    }

    setPassword(password_str);
  }, [length, charAllowed, digAllowed, setPassword]);

  const copytoclip = useCallback(() => {
    passRef.current?.select();
    passRef.current?.setSelectionRange(0, 40);
    window.navigator.clipboard.writeText(password);
    alert("Password Copied!")
  }, [password]);

  useEffect(() => { setGeneratePassword() }, [length, charAllowed, digAllowed, setPassword]);

  return (
    <>
      <div className='min-h-screen w-full bg-slate-600 flex flex-col justify-center items-center p-4'>
        <h1 className='text-3xl text-white bg-slate-950 p-5 rounded-t-lg text-center w-full max-w-md'>
          Password Generator
        </h1>
        <div className='w-full max-w-md bg-slate-300 rounded-b-lg flex flex-col justify-center items-center px-5 py-6'>
          <div className='w-full relative'>
            <input
              type="text"
              className='w-full h-12 rounded-xl p-4 mb-4 bg-slate-50'
              placeholder='Password'
              value={password}
              ref={passRef}
              disabled
            />
            <button
              onClick={copytoclip}
              className='bg-black text-white h-12 w-20 absolute top-0 right-0 rounded-r-xl'
            >
              Copy
            </button>
          </div>
          <div className='w-full flex flex-col text-center mb-4 items-center'>
            <input
              min="6"
              max="35"
              type="range"
              name="length"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className='bg-gray-200 h-5 w-full rounded-lg cursor-pointer dark:bg-gray-700 mb-2'
            />
            <label htmlFor="length">Length : {length}</label>
          </div>
          <div className='w-full flex justify-between items-center h-10 gap-4'>
            <div className='flex items-center'>
              <input
                className='cursor-pointer'
                type="checkbox"
                onClick={() => setCharAllowed(prev => !prev)}
                name="char"
                id="char"
              />
              <label
                className='bg-black text-white w-24 text-center font-bold rounded-r-lg cursor-pointer ml-2'
                htmlFor="char"
              >
                Symbols
              </label>
            </div>
            <div className='flex items-center'>
              <input
                className='cursor-pointer'
                type="checkbox"
                onClick={() => setDigAllowed(prev => !prev)}
                name="dig"
                id="dig"
              />
              <label
                className='bg-black text-white w-24 text-center font-bold rounded-r-lg cursor-pointer ml-2'
                htmlFor="dig"
              >
                Digits
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
