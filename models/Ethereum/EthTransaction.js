var bookshelf = require('../../config/bookshelf');
const EthBlock = require('./EthBlock');
const EthTransactionReceipt = require('./EthTransactionReceipt');

var EthTransaction = bookshelf.Model.extend({
  tableName: 'ethereum_transactions',
  hasTimestamps: true,

  block: function() {
    return this.belongTo(EthBlock);
  },

  transactionReceipts: function() {
    return this.hasOne(EthTransactionReceipt);
  }
});

module.exports = EthTransaction;
