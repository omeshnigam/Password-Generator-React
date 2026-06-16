import { useState, useCallback, useEffect, useRef} from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "" 
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed)
      str += "0123456789"
    if(characterAllowed)
      str += "!@#$%^&*()-+"

    for (let i = 1; i <= length; i++) {
      let char= Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99999);
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
passwordGenerator();
  }, [numberAllowed, characterAllowed, length, passwordGenerator])

  return (
    <>
     <div className='w-full max-w-md text-center mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
     <h1 className='text-4xl  text-white'>Password Generator</h1>
     <br />
      <div className="flex shadow rounded-lg overflow-hidden mb-4 bg-gray-100">
        <input type="text" name="" id="" value={password} className='outline-none w-full py-1 px-3 text-center' placeholder='password' readOnly ref={passwordRef} />
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipboard}>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}}/>
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={numberAllowed}
          id="numberInput" onChange={() => {
            setNumberAllowed((prev) => !prev);
          }} />
          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={characterAllowed}
          id="characterInput" onChange={() => {
            setCharacterAllowed((prev) => !prev);
          }} />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
      {/* Codex */}
      <div className='mt-5 pb-4 text-white text-sm'>
        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noopener noreferrer"
          className='inline-block bg-blue-700 text-white px-4 py-2 rounded-md mb-3'
        >
          Built for Digital Heroes
        </a>
        <p>Omesh Nigam</p>
        <p>
          <a href="mailto:engineeromesh@gmail.com" className='text-orange-300' target="_blank"
          rel="noopener noreferrer">
            engineeromesh@gmail.com
          </a>
        </p>
        <p className='mt-3 text-gray-200'>
          Note: Please focus on the functionality and not on UI/UX.
        </p>
      </div>
     </div>
    </>
  )
}

export default App
