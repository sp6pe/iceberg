const Web3 = require('web3');
const dotenv = require('dotenv');
const Block = require('../models/Ethereum/Block');
const Transaction = require('../models/Ethereum/Transaction');
const Log = require('../models/Ethereum/Transaction');
var Promise = require('bluebird');

dotenv.load();

const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/' + dotenv.infurakey));

web3.eth.getBlock(4798454, function(blockerror, blockdata) {
  if (blockerror) console.log(blockerror);
  else console.log(blockdata);
  var save_blocks = Block.forge({
    difficulty: blockdata.difficulty,
    extra_data: blockdata.extraData,
    gas_limit: blockdata.gasLimit,
    gas_used: blockdata.gasUsed,
    hash: blockdata.hash,
    // logs_bloom: blockdata.logsBloom,
    miner: blockdata.miner.substring(2),
    mix_hash: blockdata.mixHash,
    nonce: blockdata.nonce,
    number: blockdata.number,
    parent_hash: blockdata.parentHash.substring(2),
    receipts_root: blockdata.receiptsRoot.substring(2),
    sha_uncles: blockdata.sha3Uncles.substring(2),
    size: blockdata.size,
    state_root: blockdata.stateRoot.substring(2),
    block_timestamp: blockdata.timestamp,
    total_difficulty: blockdata.totalDifficulty,
    transactions_root: blockdata.transactionsRoot,
    uncles: blockdata.uncles
  })
    .save(null, { method: 'insert' })
    .then(function() {
      console.log('block success');
    });
  if (blockdata.transactions != []) {
    for (var t = 0; t < blockdata.transactions.length; t++) {
      web3.eth.getTransaction(blockdata.transactions[t], function(txnerror, txndata) {
        if (txnerror) console.log(txnerror);
        else
          // console.log(txndata);
          Transaction.forge({
            block_hash: txndata.blockHash,
            block_number: txndata.blockNumber,
            from: txndata.from,
            gas: txndata.gas,
            gas_price: txndata.gasPrice,
            hash: txndata.hash,
            input: txndata.input,
            nonce: txndata.nonce,
            to: txndata.to,
            transaction_index: txndata.transactionIndex,
            value: txndata.value,
            v: txndata.v,
            r: txndata.r,
            s: txndata.r
          })
            .save(null, { method: 'insert' })
            .then(function() {
              console.log('txn success');
            })
            .catch(function(err) {
              console.log(err);
              console.log(txndata.hash);
            });

        // web3.eth.getTransactionReceipt(txndata.hash, function(txnreceipterror, txnreceiptdata) {
        //   if (txnerror) {
        //     console.log(txnreceipterror);
        //   } else if (txnreceiptdata == null) {
        //     console.log('no receipt');
        //   } else {
        //     console.log(txnreceiptdata);
        //   }
        // });

        txnreceiptdata.logs;
      });
    }
  }
});
