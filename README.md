# Theta Web3 by Example

Learn how to use Web3.js with Theta by examples!

References:
https://www.dappuniversity.com/articles/web3-js-intro
https://www.youtube.com/playlist?list=PLS5SEs8ZftgXlCGXNfzKdq7nGBcIaVOdN

## Getting Started

### Setup Theta local privatenet

First, setup the Theta local privatenet and the ETH RPC adaptor following [this guide](https://docs.thetatoken.org/docs/setup-local-theta-ethereum-rpc-adaptor). The ETH RPC adaptor running at `http://localhost:18888/rpc` interacts with the Web3.js library by translating the Theta RPC interface into the ETH RPC interface.

### Fund the test accounts with some TFuel
export SEQ=`thetacli query account --address=0x2E833968E5bB786Ae419c4d13189fB081Cc43bab | grep sequence | grep -o '[[:digit:]]\+'`
thetacli tx send --chain="privatenet" --from=0x2E833968E5bB786Ae419c4d13189fB081Cc43bab --to=0x19E7E376E7C213B7E7e7e46cc70A5dD086DAff2A --tfuel=1000 --password=qwertyuiop --seq=$(($SEQ+1))


### Install dependencies

Execute the command below to install dependencies:

`$ npm install`

### Run the examples

Run the following scripts to interact with the Theta local privatenet through Web3.js. Note that the chainID of the Theta local privatenet is 366. When we compose the transactions, we need to specify the chainID, otherwise the transactions will be rejected by the blockchain.

```
# This example shows how to query the TFuel balance of a given account
node examples/account_query.js

# This example shows how to inspect the latest blocks
node examples/block_inspection.js

# This example shows how to deploy a smart contract to the local privatenet
$ node examples/contract_deploy.js

# This example shows how to send TFuel between two accounts
$ node examples/send_signed_transaction.js

# This example shows how some extra features of the Web3.js library
$ node examples/web3_extras.js
```

