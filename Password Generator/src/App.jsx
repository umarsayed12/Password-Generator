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
      <div className='h-screen w-screen bg-slate-600 flex flex-col justify-center items-center'>
        <h1 className='text-3xl text-white bg-slate-950 p-5 rounded-t-lg text-center w-1/3 sm:w-2/3 xs:w-full'>Password Generator</h1>
        <div className='h-1/3 w-1/3 bg-slate-300 rounded-b-lg flex flex-col justify-center items-center px-10 sm:w-2/3 xs:w-full'>
          <div className='w-full'>
            <input type="text" className='w-full h-10 rounded-xl p-5 relative mb-10 bg-slate-50' placeholder='Password' value={password} ref={passRef} disabled />
            <button onClick={copytoclip} className='bg-black cursor-pointer text-white h-10 w-20 absolute -translate-x-20 rounded-r-xl' >Copy</button>
            <div className='w-full flex flex-col text-center mb-5 justify-center items-center gap-2'>
              <input min="6" max="35" type="range" name="length" length="100" value={length} onChange={(e) => setLength(e.target.value)} className='bg-gray-200 h-5 w-1/2 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-0.5' />
              <label htmlFor="length">Length : {length}</label>
            </div>
            <div className='w-full flex justify-center items-center h-10 gap-4'>
              <div className='flex'>
                <input className='size-6 cursor-pointer' type="checkbox" onClick={() => setCharAllowed(prev => !prev)} name="char" id="char" />
                <label className='bg-black w-28 rounded-r-lg cursor-pointer text-center font-bold text-md text-white h-full' htmlFor="char">Symbols</label>
              </div>
              <div className='flex'>
                <input className='size-6 cursor-pointer' type="checkbox" name="dig" onClick={() => setDigAllowed(prev => !prev)} id="dig" />
                <label className='bg-black w-28 rounded-r-lg cursor-pointer text-center font-bold text-md text-white h-full' htmlFor="dig">Digits</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
