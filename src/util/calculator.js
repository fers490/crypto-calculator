import { ethers } from 'ethers';

const factor = ethers.FixedNumber.from(`${10**18}`)

export const add = async (a, b, contract) => {
    const res = await contract.add(ethers.FixedNumber.from(a, 'fixed256x18'), ethers.FixedNumber.from(b, 'fixed256x18'));
    return ethers.FixedNumber.from(res).divUnsafe(factor).toString();
}

export const sub = async (a, b, contract) => {
    const res = await contract.sub(ethers.FixedNumber.from(a, 'fixed256x18'), ethers.FixedNumber.from(b, 'fixed256x18'));
    return ethers.FixedNumber.from(res).divUnsafe(factor).toString();
}

export const mul = async (a, b, contract) => {
    const res = await contract.mul(ethers.FixedNumber.from(a, 'fixed256x18'), ethers.FixedNumber.from(b, 'fixed256x18'), 18);
    return ethers.FixedNumber.from(res).divUnsafe(factor).toString();
}

export const div = async (a, b, contract) => {
    const res = await contract.div(ethers.FixedNumber.from(a, 'fixed256x18'), ethers.FixedNumber.from(b, 'fixed256x18'), 18);
    return ethers.FixedNumber.from(res.toString(), 18).divUnsafe(factor).toString();
}