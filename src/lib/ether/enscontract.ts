import { ethers } from "ethers";

const abi = `[{
    "anonymous":false,
    "inputs":[
        {
            "indexed":true,
            "internalType":"address",
            "name":"from",
            "type":"address"
        },
        {
            "indexed":true,
            "internalType":"address",
            "name":"to",
            "type":"address"
        },
        {
            "indexed":true,
            "internalType":"uint256",
            "name":"tokenId",
            "type":"uint256"
        }
    ],
    "name":"Transfer",
    "type":"event"
}]`
const address='0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85'
const url = "";

const rpc={
    name: 'ethereum',
    rpc: 'https://mainnet.infura.io/v3/', // Insert your RPC URL here
    chainId: 1, // 0x504 in hex,
  }
const provider =  ethers.getDefaultProvider('homestead');
const contract = new ethers.Contract(address,abi,provider)

const  iface = new ethers.Interface(abi)
function decodeTopic(log){
   return iface.parseLog(log)
}

export { contract, provider, decodeTopic };