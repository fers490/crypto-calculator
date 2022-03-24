// import './App.css';

import { useEffect, useState } from 'react'
import { useProvider, useContract } from './hooks/web3'

import Calculator from './artifacts/contracts/Calculator.sol/Calculator.json';

import { add as addFn, sub as subFn, mul as mulFn, div as divFn } from './util/calculator'

const contractAddr = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'

function App() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [result, setResult] = useState(0);

  const provider = useProvider(window.ethereum);
  const signer = provider.getSigner();
  const contract = useContract(contractAddr, Calculator.abi, signer);

  useEffect(() => {
    window.ethereum.request({ method: 'eth_requestAccounts' });
  });

  async function add() {
    const result = await addFn(a, b, contract);
    setResult(result);
  }

  async function sub() {
    const result = await subFn(a, b, contract);
    setResult(result);
  }

  async function mul() {
    const result = await mulFn(a, b, contract);
    setResult(result);
  }

  async function div() {
    try {
      const result = await divFn(a, b, contract);
      setResult(result);
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    <div className="min-h-screen bg-slate-800 text-white py-6 px-4 sm:p-6 md:py-10 md:px-8">
      <div className="grid grid-cols-5 grid-rows-5 gap-5 m-5">
        <h1 className='leading-3 col-span-5 self-center justify-self-center text-2xl font-semibold'>Calculator</h1>
        {/* <span className="flex font-sans items-center justify-between"> */}
          <label className='justify-self-start self-center'>A</label><input type='number' value={a} placeholder='First operator' onChange={(event) => setA(event.target.value)} className="col-span-4 justify-self-center self-center focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"></input>
        {/* </span> */}
        {/* <span className="flex font-sans items-center justify-between"> */}
          <label className='justify-self-start self-center'>B</label><input type='number' value={b} placeholder='First operator' onChange={(event) => setB(event.target.value)} className="col-span-4 justify-self-center self-center focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"></input>
        {/* </span> */}
        {/* <span className="flex font-sans items-stretch justify-stretch"> */}
        <span></span>
          <button onClick={add} className="text-2xl hover:bg-blue-400 rounded-md bg-blue-500 text-white font-bold pl-2 pr-3 py-2 shadow-sm">+</button>
          <button onClick={sub} className="text-2xl hover:bg-blue-400 rounded-md bg-blue-500 text-white font-bold pl-2 pr-3 py-2 shadow-sm">-</button>
          <button onClick={mul} className="text-2xl hover:bg-blue-400 rounded-md bg-blue-500 text-white font-bold pl-2 pr-3 py-2 shadow-sm">*</button>
          <button onClick={div} className="text-2xl hover:bg-blue-400 rounded-md bg-blue-500 text-white font-bold pl-2 pr-3 py-2 shadow-sm">/</button>
        {/* </span> */}
        {/* <span className="flex font-sans items-center justify-between"> */}
          <label className='justify-self-start self-center'>Result</label><input type='number' value={result} placeholder='Result' readOnly className="col-span-4 justify-self-center self-center focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"></input>
        {/* </span> */}
        
      </div>
    </div>
  );
}

export default App;
