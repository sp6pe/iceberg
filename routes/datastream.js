const Web3 = require('web3');
var dotenv = require('dotenv');
var Block = require('../models/Block');

dotenv.load();

const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/' + dotenv.infurakey));

//Get Blockdata of latest block
web3.eth.getBlockNumber(function(error, block) {
  if (error) console.error(error);
  else
    web3.eth.getBlock(2000001, function(error, result) {
      if (error) console.log(error);
      else
        console.log(result)
        Block.forge({
          difficulty: result.difficulty,
          extra_data: result.extraData,
          gas_limit: result.gasLimit,
          gas_used: result.gasUsed,
          hash: result.hash,
          // logs_bloom: result.logsBloom,
          miner: result.miner.substring(2),
          mix_hash: result.mixHash,
          nonce: result.nonce,
          number: result.number,
          parent_hash: result.parentHash.substring(2),
          receipts_root: result.receiptsRoot.substring(2),
          sha_uncles: result.sha3Uncles.substring(2),
          size: result.size,
          state_root: result.stateRoot.substring(2),
          block_timestamp: result.timestamp,
          total_difficulty: result.totalDifficulty,
          transactions_root: result.transactionsRoot,
          uncles: result.uncles
        })
          .save(null, { method: 'insert' })
          .then(function() {
            console.log('success');
            process.exit(0);
          })
          .catch(function(err) {
            console.log(err);
          });
    });
});
