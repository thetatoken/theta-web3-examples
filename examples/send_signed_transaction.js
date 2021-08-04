var Tx     = require('ethereumjs-tx')
const Web3 = require('web3')
const web3 = new Web3('http://127.0.0.1:18888/rpc')
const chainID = 366 // for the local privatenet

const account1 = '0x19E7E376E7C213B7E7e7e46cc70A5dD086DAff2A' // Your account address 1
const account2 = '0x1563915e194D8CfBA1943570603F7606A3115508' // Your account address 2

const privateKey1 = Buffer.from('1111111111111111111111111111111111111111111111111111111111111111', 'hex')
const privateKey2 = Buffer.from('2222222222222222222222222222222222222222222222222222222222222222', 'hex')

web3.eth.getTransactionCount(account1, (err, txCount) => {
  console.log(txCount)

  // Build the transaction
  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    to:       account2,
    value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('4000', 'gwei')),
    chainId: chainID
  }

  // Sign the transaction
  const tx = new Tx(txObject)
  tx.sign(privateKey1)

  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')

  // Broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('txHash:', txHash)
    // Now go check etherscan to see the transaction!
  })
})
