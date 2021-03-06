const Web3 = require('web3');
const dotenv = require('dotenv');
const EthBlock = require('../models/Ethereum/EthBlock');
const EthTransaction = require('../models/Ethereum/EthTransaction');
const EthTransactionReceipt = require('../models/Ethereum/EthTransactionReceipt');
const EthLog = require('../models/Ethereum/EthLog');
var Promise = require('bluebird');

dotenv.load();

const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/' + dotenv.infurakey));

web3.eth.getBlock(425462, function(blockerror, blockdata) {
  if (blockerror) console.log('block error', blockerror);
  EthBlock.forge({
    difficulty: blockdata.difficulty,
    extra_data: blockdata.extraData,
    gas_limit: blockdata.gasLimit,
    gas_used: blockdata.gasUsed,
    hash: blockdata.hash,
    logs_bloom: blockdata.logsBloom,
    mix_hash: blockdata.mixHash,
    nonce: blockdata.nonce,
    number: blockdata.number,
    parent_hash: blockdata.parentHash,
    receipts_root: blockdata.receiptsRoot,
    sha_uncles: blockdata.sha3Uncles,
    size: blockdata.size,
    state_root: blockdata.stateRoot,
    block_timestamp: blockdata.timestamp,
    total_difficulty: blockdata.totalDifficulty,
    transactions_root: blockdata.transactionsRoot,
    uncles: JSON.stringify(blockdata.uncles)
  })
    .save(null, { method: 'insert' })
    .then(function(savedBlock) {
      console.log(savedBlock.id, 'on the high lecel');
      if (blockdata.transactions != []) {
        for (var t = 0; t < blockdata.transactions.length; t++) {
          web3.eth.getTransaction(blockdata.transactions[t], function(txnerror, txndata) {
            if (txnerror) console.log(txnerror);
            else console.log(savedBlock.id, 'in the else');
            // console.log(txndata);
            EthTransaction.forge({
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
              s: txndata.r,
              block_id: savedBlock.id
            })
              .save(null, { method: 'insert' })
              .then(function(savedTransaction) {
                web3.eth.getTransactionReceipt(txndata.hash, function(txnreceipterror, txnreceiptdata) {
                  if (txnerror) {
                    console.log(txnreceipterror);
                  } else if (txnreceiptdata == null) {
                    console.log('no receipt');
                  } else {
                    console.log(txnreceiptdata);
                    EthTransactionReceipt.forge({
                      contract_address: txnreceiptdata.contractAddress,
                      cumulative_gas_used: txnreceiptdata.cumulativeGasUsed,
                      gas_used: txnreceiptdata.gasUsed,
                      logs_bloom: txnreceiptdata.logsBloom,
                      status: txnreceiptdata.status,
                      transaction_id: savedTransaction.id
                    })
                      .save(null, { method: 'insert' })
                      .then(function(savedTrasnactionReceipt) {
                        console.log('txnreceipt success');
                        for (var l = 0; l < txnreceiptdata.logs.length; l++) {
                          EthLog.forge({
                            address: txnreceiptdata.logs[l].address,
                            topics: JSON.stringify(txnreceiptdata.logs[l].topics),
                            data: txnreceiptdata.logs[l].data,
                            log_index: txnreceiptdata.logs[l].logIndex,
                            removed: txnreceiptdata.logs[l].removed,
                            log_id: txnreceiptdata.logs[l].id,
                            transaction_receipts_id: savedTrasnactionReceipt.id
                          })
                            .save(null, { method: 'insert' })
                            .then(function() {
                              console.log('log success');
                            })
                            .catch(function(err) {
                              console.log(err);
                              process.exit(0);
                            });
                        }
                      })
                      .catch(function(err) {
                        console.log(err);
                        process.exit(0);
                      });
                  }
                  console.log('txn success');
                });
              })
              .catch(function(err) {
                console.log(err);
                process.exit(0);
              });
          });
        }
      }
    })
    .catch(function(err) {
      process.exit(0);
    });
});
