const Web3 = require('web3');
var dotenv = require('dotenv');

dotenv.load();

const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/' + dotenv.infurakey));

//Get Blockdata of latest block
web3.eth.getBlockNumber(function(error, result) {
  if (error) console.error(error);
  else
    web3.eth.getBlock(result, function(error, result) {
      if (!error) console.log(result);
      else console.error(error);
    });
});
