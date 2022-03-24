const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Calculator", function () {
  let calculator

  before(async function () {
    const Calculator = await ethers.getContractFactory("Calculator");
    calculator = await Calculator.deploy();
    await calculator.deployed();
  })

  const add_tests = [
    {a: ethers.BigNumber.from('0'), b: ethers.BigNumber.from('0'), result: ethers.BigNumber.from('0')},
    {a: ethers.BigNumber.from('0'), b: ethers.BigNumber.from('1000000000000000000'), result: ethers.BigNumber.from('1000000000000000000')},
    {a: ethers.BigNumber.from('0'), b: ethers.BigNumber.from('-1'), result: ethers.BigNumber.from('-1')},
    {a: ethers.BigNumber.from('5000000000000000000'), b: ethers.BigNumber.from('7000000000000000000'), result: ethers.BigNumber.from('12000000000000000000')},
    {a: ethers.BigNumber.from('36545626'), b: ethers.BigNumber.from('786876'), result: ethers.BigNumber.from('37332502')},
    {a: ethers.BigNumber.from('-7'), b: ethers.BigNumber.from('12'), result: ethers.BigNumber.from('5')},
    {a: ethers.BigNumber.from('-3000000000000000000'), b: ethers.BigNumber.from('-59000000000000000000'), result: ethers.BigNumber.from('-62000000000000000000')}
  ]
  for (const t of add_tests) {
    let factor_str = `${10**18}`
    let factor = ethers.FixedNumber.from(factor_str)
    let a = ethers.FixedNumber.from(t.a).divUnsafe(factor)
    let b = ethers.FixedNumber.from(t.b).divUnsafe(factor)
    let result = ethers.FixedNumber.from(t.result).divUnsafe(factor)
    it(`Should add ${a} and ${b} and obtain ${result}`, async function () {
      expect(await calculator.add(t.a, t.b)).to.equal(t.result);
    });
  }

  const sub_tests = [
    {a: ethers.BigNumber.from('0'), b: ethers.BigNumber.from('0'), result: ethers.BigNumber.from('0')},
    {a: ethers.BigNumber.from('0'), b: ethers.BigNumber.from('1'), result: ethers.BigNumber.from('-1')},
    {a: ethers.BigNumber.from('0'), b: ethers.BigNumber.from('-1'), result: ethers.BigNumber.from('1')},
    {a: ethers.BigNumber.from('-5000000000000000000'), b: ethers.BigNumber.from('7000000000000000000'), result: ethers.BigNumber.from('-12000000000000000000')},
    {a: ethers.BigNumber.from('36545626'), b: ethers.BigNumber.from('786876'), result: ethers.BigNumber.from('35758750')},
    {a: ethers.BigNumber.from('-7000000000000000000'), b: ethers.BigNumber.from('12000000000000000000'), result: ethers.BigNumber.from('-19000000000000000000')},
    {a: ethers.BigNumber.from('-3'), b: ethers.BigNumber.from('-59'), result: ethers.BigNumber.from('56')},
    {a: ethers.BigNumber.from('956947905540130027057420466358272244451077980011264987101000000000000000000'), b: ethers.BigNumber.from('956947905540130027057420466358272244451077980011264987102000000000000000000'), result: ethers.BigNumber.from('-1000000000000000000')}
  ]
  for (const t of sub_tests) {
    let factor_str = `${10**18}`
    let factor = ethers.FixedNumber.from(factor_str)
    let a = ethers.FixedNumber.from(t.a).divUnsafe(factor)
    let b = ethers.FixedNumber.from(t.b).divUnsafe(factor)
    let result = ethers.FixedNumber.from(t.result).divUnsafe(factor)
    it(`Should subtract ${b} from ${a} and obtain ${result}`, async function () {
      expect(await calculator.sub(t.a, t.b)).to.equal(t.result);
    });
  }

  const mul_tests = [
    {a: ethers.BigNumber.from('0'), b: ethers.BigNumber.from('0'), result: ethers.BigNumber.from('0')},
    {a: ethers.BigNumber.from('0'), b: ethers.BigNumber.from('1000000000000000000'), result: ethers.BigNumber.from('0')},
    {a: ethers.BigNumber.from('0'), b: ethers.BigNumber.from('-1000000000000000000'), result: ethers.BigNumber.from('0')},
    {a: ethers.BigNumber.from('-5000000000000000000'), b: ethers.BigNumber.from('7000000000000000000'), result: ethers.BigNumber.from('-35000000000000000000')},
    {a: ethers.BigNumber.from('365000000000000000000'), b: ethers.BigNumber.from('786000000000000000000'), result: ethers.BigNumber.from('286890000000000000000000')},
    {a: ethers.BigNumber.from('-7000000000000000000'), b: ethers.BigNumber.from('12000000000000000000'), result: ethers.BigNumber.from('-84000000000000000000')},
    {a: ethers.BigNumber.from('-3000000000000000000'), b: ethers.BigNumber.from('-59000000000000000000'), result: ethers.BigNumber.from('177000000000000000000')},
    {a: ethers.BigNumber.from('-3000000000000000002'), b: ethers.BigNumber.from('-59000000000000000001'), result: ethers.BigNumber.from('177000000000000000121')}
  ]
  for (const t of mul_tests) {
    let factor_str = `${10**18}`
    let factor = ethers.FixedNumber.from(factor_str)
    let a = ethers.FixedNumber.from(t.a).divUnsafe(factor)
    let b = ethers.FixedNumber.from(t.b).divUnsafe(factor)
    let result = ethers.FixedNumber.from(t.result).divUnsafe(factor)
    it(`Should multiply ${a} and ${b} and obtain ${result}`, async function () {
      expect(await calculator.mul(t.a, t.b, 18)).to.equal(t.result);
    });
  }

  const div_tests = [
    {a: ethers.BigNumber.from('0'), b: ethers.BigNumber.from('1000000000000000000'), result: ethers.BigNumber.from('0')},
    {a: ethers.BigNumber.from('0'), b: ethers.BigNumber.from('-1000000000000000000'), result: ethers.BigNumber.from('0')},
    {a: ethers.BigNumber.from('-35000000000000000000'), b: ethers.BigNumber.from('7000000000000000000'), result: ethers.BigNumber.from('-5000000000000000000')},
    {a: ethers.BigNumber.from('365000000000000000000'), b: ethers.BigNumber.from('786000000000000000000'), result: ethers.BigNumber.from('464376590330788804')},
    {a: ethers.BigNumber.from('-7000000000000000000'), b: ethers.BigNumber.from('12000000000000000000'), result: ethers.BigNumber.from('-583333333333333333')},
    {a: ethers.BigNumber.from('-59000000000000000000'), b: ethers.BigNumber.from('3000000000000000000'), result: ethers.BigNumber.from('-19666666666666666667')}
  ]
  // const factor = ethers.FixedNumber.from(10**18)
  for (const t of div_tests) {
    let factor_str = `${10**18}`
    let factor = ethers.FixedNumber.from(factor_str)
    let a = ethers.FixedNumber.from(t.a).divUnsafe(factor)
    let b = ethers.FixedNumber.from(t.b).divUnsafe(factor)
    let result = ethers.FixedNumber.from(t.result).divUnsafe(factor)
    it(`Should divide ${a} by ${b} and obtain ${result}`, async function () {
      expect(await calculator.div(t.a, t.b, 18)).to.equal(t.result);
    });
  }
  it(`Should throw an exception while dividing by zero`, async function () {
    await expect(calculator.div(5, 0, 18)).to.be.revertedWith('Division by zero not allowed');
  });

  
});