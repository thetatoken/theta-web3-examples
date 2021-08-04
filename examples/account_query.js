const Web3 = require('web3')
const rpcURL = 'http://127.0.0.1:18888/rpc' // Your PRC URL goes here
const web3 = new Web3(rpcURL)
const address = '0x2E833968E5bB786Ae419c4d13189fB081Cc43bab' // Your account address goes here
web3.eth.getBalance(address, (err, wei) => { balance = web3.utils.fromWei(wei, 'ether') }).then(
    function(result) {
        console.log("Address:", address)
        console.log("TFuelWei Balance:", result)
     }
)