const Web3 = require('web3');
const dotenv = require('dotenv');
const EthBlock = require('../models/Ethereum/EthBlock');
const EthTransaction = require('../models/Ethereum/EthTransaction');
const EthTransactionReceipt = require('../models/Ethereum/EthTransactionReceipt');
const EthLog = require('../models/Ethereum/EthLog');
var Promise = require('bluebird');

dotenv.load();

const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/' + dotenv.infurakey));

starting_block = process.argv[2]
ending_block = process.argv[3]

for (var i = starting_block; i < ending_block; i++){
  web3.eth.getBlock(i)
  .then(function(block){
    blockData = create_block_obj(block)
    EthBlock.forge(blockData)
      .save(null, { method: 'insert' })
      .then(function(savedBlock){
        console.log('saves the block', savedBlock)
        if (block.transactions != []){
          console.log(block.transactions.length, '# of txxx')
          for (var t = 0; t < block.transactions.length; t++) {
            console.log(t, 'looping')
            web3.eth.getTransaction(block.transactions[t])
            .then(function(transaction){
              txnData = create_transaction_obj(transaction, savedBlock.id)
              EthTransaction.forge(txnData)
              .save(null, { method: 'insert' })
              .then(function(savedTransaction){

                web3.eth.getTransactionReceipt(transaction.hash)
                .then(function(transactionReceipt){
                  txnReceiptData = create_transaction_receipt_obj(transactionReceipt,savedTransaction.id)
                  EthTransactionReceipt.forge(txnReceiptData)
                  .save(null, { method: 'insert' })
                  .then(function(savedTrasnactionReceipt){

                    //LOGS
                    if (transactionReceipt.logs != []){
                      for (var l = 0; l < transactionReceipt.logs.length; l++){
                        logsObj = create_logs_obj(transactionReceipt.logs[l], savedTrasnactionReceipt.id)
                        EthLog.forge(logsObj)
                        .save(null, { method: 'insert' })
                        .catch(function(err){
                          console.log(err,'error saving log',transactionReceipt.logs[l].address)
                        })
                      }
                    }

                  })
                  .catch(function(err){
                    console.log(err,'error saving txReceitpt',transaction.hash)
                  })
                })
                .catch(function(err){
                  console.log(err,'error getting txReceitpt',transaction.hash)
                })
              })
              .catch(function(err){
                console.log(err, 'error saving transaction', transaction.hash)
              })
            })
            .catch(function(err){
              console.log(err, 'error getting transaction', block.transactions[t])
            })
          }
        }
      })
      .catch(function(err){
        console.log(err, 'error saving block', i)
      })
  })
  .catch(function(err){
    console.log(err, 'error getting block', i)
  })
}


function create_block_obj (blockObj){
  if (blockObj == null) {
    return false
  }
  return {
    difficulty: blockObj.difficulty,
    extra_data: blockObj.extraData,
    gas_limit: blockObj.gasLimit,
    gas_used: blockObj.gasUsed,
    hash: blockObj.hash,
    logs_bloom: blockObj.logsBloom,
    mix_hash: blockObj.mixHash,
    nonce: blockObj.nonce,
    number: blockObj.number,
    parent_hash: blockObj.parentHash,
    receipts_root: blockObj.receiptsRoot,
    sha_uncles: blockObj.sha3Uncles,
    size: blockObj.size,
    state_root: blockObj.stateRoot,
    block_timestamp: blockObj.timestamp,
    total_difficulty: blockObj.totalDifficulty,
    transactions_root: blockObj.transactionsRoot,
    uncles: JSON.stringify(blockObj.uncles)
  }
}


function create_transaction_obj (txnObj, savedBlockId){
  if (txnObj == null) {
    return false
  }
  return {
    block_hash: txnObj.blockHash,
    block_number: txnObj.blockNumber,
    from: txnObj.from,
    gas: txnObj.gas,
    gas_price: txnObj.gasPrice,
    hash: txnObj.hash,
    input: txnObj.input,
    nonce: txnObj.nonce,
    to: txnObj.to,
    transaction_index: txnObj.transactionIndex,
    value: txnObj.value,
    v: txnObj.v,
    r: txnObj.r,
    s: txnObj.r,
    block_id: savedBlockId
  }
}


function create_transaction_receipt_obj (txnReceiptObj, savedTransactionId){
  if (txnReceiptObj == null) {
    return false
  }
  return {
    contract_address: txnReceiptObj.contractAddress,
    cumulative_gas_used: txnReceiptObj.cumulativeGasUsed,
    gas_used: txnReceiptObj.gasUsed,
    logs_bloom: txnReceiptObj.logsBloom,
    status: txnReceiptObj.status,
    transaction_id: savedTransactionId
  }
}


function create_logs_obj (logsObj, savedTrasnactionReceiptId){
  if (logsObj == null) {
    return false
  }
  return {
    address: logsObj.address,
    topics: JSON.stringify(logsObj.topics),
    data: logsObj.data,
    log_index: logsObj.logIndex,
    removed: logsObj.removed,
    log_id: logsObj.id,
    transaction_receipts_id: savedTrasnactionReceiptId
  }
}
