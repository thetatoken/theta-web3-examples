const Web3 = require('web3');
const web3 = new Web3('https://eth-rpc-api.thetatoken.org/rpc')
const chainID = 361 // for the Theta Mainnet

// Variables definition
const privKey       = '1111111111111111111111111111111111111111111111111111111111111111'
const senderAddr    = "0x19E7E376E7C213B7E7e7e46cc70A5dD086DAff2A"
const recipientAddr = "0x1563915e194D8CfBA1943570603F7606A3115508"

const tdropContractAddress = "0x1336739B05C7Ab8a526D40DCC0d04a826b5f8B03";
const abi = [{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint8","name":"decimals_","type":"uint8"},{"internalType":"uint256","name":"initialSupply_","type":"uint256"},{"internalType":"bool","name":"mintable_","type":"bool"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"mintable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]
const contract = new web3.eth.Contract(abi, tdropContractAddress)

// Create transaction
const sendTDrop = async () => {
   const tdropAmountInWei = "100"

   console.log(`Attempting to send ${tdropAmountInWei} wei of TDROP from ${senderAddr} to ${recipientAddr}`);
  
   const count = await web3.eth.getTransactionCount(senderAddr);
   const createTransaction = await web3.eth.accounts.signTransaction({
        "from": senderAddr,
        "nonce": web3.utils.toHex(count),
        "gas": web3.utils.toHex(150000),
        "to": tdropContractAddress,
        "data": contract.methods.transfer(recipientAddr, tdropAmountInWei).encodeABI()
      },
      privKey
   );

   // Deploy transaction
   const createReceipt = await web3.eth.sendSignedTransaction(
      createTransaction.rawTransaction
   );

   console.log("");
   console.log("Transaction successful with hash:", createReceipt.transactionHash);
   console.log("");
   console.log("Transaction details:", JSON.stringify(createReceipt, null, "  "));
};

sendTDrop();

