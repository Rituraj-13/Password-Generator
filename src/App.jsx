import { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialcharAllowed, setSpecialCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null) 

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy";

    if (numberAllowed) {
      str += "0123456789"
    }

    if (specialcharAllowed) {
      str += "~!@#$%^&*(){}?></*+"
    }

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numberAllowed, specialcharAllowed])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, specialcharAllowed, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-550 mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700 text-center">
        <h1 className='text-center text-white mb-8 pt-7 select-none'>Password Generator</h1>
        <div className="flex mb-8 ">
          <input
            type="text"
            value={password}
            className='w-full  px-3 rounded-lg text-lg font-semibold'
            placeholder='Enter Password'
            readOnly 
            ref={passwordRef}/>
          <button onClick={copyPasswordToClipboard} className='outline-none px-3 rounded-lg py-3 bg-blue-800 font-semibold text-white'>Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className="flex items-center gap-x-1 mb-5">
            <input
              type='range'
              min={5}
              max={50}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length: {length}</label>
          </div>


          <div className="flex items-center gap-x-1 mb-5">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => setNumberAllowed((prev) => !prev)} />
            <label htmlFor="numberInput">Numbers</label>
          </div>


          <div className="flex items-center gap-x-1 mb-5">
            <input
              type="checkbox"
              defaultChecked={specialcharAllowed}
              id='numberInput'
              onChange={() => setSpecialCharAllowed((prev) => !prev)} />
            <label htmlFor="numberInput">Special Characters</label>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
