const Web3 = require('web3');
var EthereumBlocks = require('ethereum-blocks');
var dotenv = require('dotenv');

dotenv.load();

const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/' + dotenv.infurakey));

// create a new instance
const blocks = new EthereumBlocks({ web3: web3 });

// register a handler called "myHandler"
blocks.registerHandler('myHandler', (eventType, blockId, data) => {
  switch (eventType) {
    case 'block':
      /* data = result of web3.eth.getBlock(blockId) */
      console.log('Block id', blockId);
      console.log('Block nonce', data.nonce);
      break;
    case 'error':
      /* data = Error instance */
      console.error(data);
      break;
  }
});

// start the block processor
blocks.start().catch(console.error);
