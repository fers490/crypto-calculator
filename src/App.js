// import './App.css';

import { useEffect, useState } from 'react'
import { useProvider, useContract } from './hooks/web3'

import Calculator from './artifacts/contracts/Calculator.sol/Calculator.json';

import { add, sub, mul, div } from './util/calculator'
import Button from './components/Button';

const contractAddr = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

function App() {
  const [memory, setMemory] = useState('');
  // When true, next input whill replace the entire displayed value
  const [freshDisplay, setFreshDisplay] = useState(true);
  const [displayValue, setDisplayValue] = useState('0');
  const [activeOperation, setActiveOperation] = useState('');
  const clearText = displayValue === '0' ? 'AC' : 'C';
  const decimalSymbol = '.'

  const provider = useProvider(window.ethereum);
  const signer = provider.getSigner();
  const contract = useContract(contractAddr, Calculator.abi, signer);

  const operationMap = {
    'add': add,
    'sub': sub,
    'mul': mul,
    'div': div
  }

  const keyDownMap = {
    '0': () => appendNumber('0'),
    '1': () => appendNumber('1'),
    '2': () => appendNumber('2'),
    '3': () => appendNumber('3'),
    '4': () => appendNumber('4'),
    '5': () => appendNumber('5'),
    '6': () => appendNumber('6'),
    '7': () => appendNumber('7'),
    '8': () => appendNumber('8'),
    '9': () => appendNumber('9'),
    '.': appendDecimalSymbol,
    '+': () => setOperation('add'),
    '-': () => setOperation('sub'),
    '*': () => setOperation('mul'),
    '/': () => setOperation('div'),
    '%': percent,
    '=': compute,
    'Enter': compute,
    'c': clear,
    'C': clear
  }

  useEffect(() => {
    document.title = "Calculator"
    window.ethereum.request({ method: 'eth_requestAccounts' });
    document.addEventListener('keydown',keyDown);
    return function cleanup() {
      document.removeEventListener('keydown', keyDown);
    }
  }, [keyDown]);

  function setOperation(operation) {
    setMemory(displayValue)
    setDisplayValue('0')
    setActiveOperation(operation)
  }

  async function percent() {
    const result = await operationMap['div'](displayValue, 100, contract)
    setDisplayValue(result);
    setFreshDisplay(true);
  }

  // Might be replaced with a better solution using built-in number support instead of regexp
  function inputChange(v) {
    if (/^-?(\d*)(\.\d*)?$/.test(v)) {
      setDisplayValue(stripLeadingZeros(v))
      setFreshDisplay(false);
    }
  }

  // Might be replaced with a better solution using built-in number support instead of regexp
  function stripLeadingZeros(v) {
    return v.replace(/^(-?)(0+)([1-9])/, '$1$3').replace(/^(-?)(0*)($|\.)/,'$10$3')
  }

  function appendNumber(number) {
    if (freshDisplay) {
      inputChange(number)
    } else {
      inputChange(displayValue+number)
    }
  }

  function appendDecimalSymbol() {
    if (freshDisplay) {
      inputChange(decimalSymbol)
    } else {
      inputChange(displayValue+decimalSymbol)
    }
  }

  function clear() {
    if (displayValue === '0') {
      allClear()
    } else {
      clearEntry()
    }
  }

  function allClear() {
    setMemory('0')
    setActiveOperation('')
  }

  function clearEntry() {
    inputChange('0')
  }

  function setError() {
    setDisplayValue('Error')
    setFreshDisplay(true)
    allClear()
  }

  function toggleSign() {
    if (displayValue.startsWith('-')) {
      inputChange(displayValue.substring(1))
    } else {
      inputChange('-'+displayValue)
    }
  }

  async function compute() {
    if (activeOperation !== '') {
      try {
        const result = await operationMap[activeOperation](memory, displayValue, contract)
        setDisplayValue(result);
        setActiveOperation('');
        setMemory('');
        setFreshDisplay(true);
      } catch (ex) {
        console.log(ex)
        setError()
      }
    }
  }

  function keyDown(e) {
    if (keyDownMap[e.key]) {
      keyDownMap[e.key]();
    }
  }

  return (

    <div onKeyDown={keyDown} className="min-h-screen bg-slate-900 py-6 flex flex-col justify-center relative overflow-hidden sm:py-12">
      <div className="relative px-1 pt-1 pb-1 bg-slate-800 shadow-xl ring-1 ring-gray-900/5 sm:max-w-lg sm:mx-auto sm:rounded-lg sm:px-1">
        <div className="grid grid-cols-4 grid-rows-6 m-3">
          <input type='text' pattern='[0-9-]*' value={displayValue} placeholder='0' onInput={(event) => inputChange(event.target.value)} className="text-2xl col-span-4 justify-self-center self-center focus:outline-none appearance-none w-full leading-6 text-slate-900 placeholder-slate-400 py-3 px-5 text-right border-solid border-2 border-slate-800"></input>
          <Button onClick={clear} theme='util' text={clearText} />
          <Button onClick={toggleSign} theme='util' text='+/-' />
          <Button onClick={percent} theme='util' text='%' />
          <Button onClick={() => setOperation('div')} theme='operation' active={activeOperation === 'div'} text='÷' />
          <Button onClick={() => appendNumber('1')} theme='number' text='1' />
          <Button onClick={() => appendNumber('2')} theme='number' text='2' />
          <Button onClick={() => appendNumber('3')} theme='number' text='3' />
          <Button onClick={() => setOperation('mul')} theme='operation' active={activeOperation === 'mul'} text='×' />
          <Button onClick={() => appendNumber('4')} theme='number' text='4' />
          <Button onClick={() => appendNumber('5')} theme='number' text='5' />
          <Button onClick={() => appendNumber('6')} theme='number' text='6' />
          <Button onClick={() => setOperation('sub')} theme='operation' active={activeOperation === 'sub'} text='-' />
          <Button onClick={() => appendNumber('1')} theme='number' text='1' />
          <Button onClick={() => appendNumber('2')} theme='number' text='2' />
          <Button onClick={() => appendNumber('3')} theme='number' text='3' />
          <Button onClick={() => setOperation('add')} theme='operation' active={activeOperation === 'add'} text='+' />
          <Button onClick={() => appendNumber('0')} theme='number' text='0' colspan={2} />
          <Button onClick={appendDecimalSymbol} theme='number' text={decimalSymbol} />
          <Button onClick={compute} theme='operation' text='=' />
        </div>
      </div>
    </div>
  );
}

export default App;
