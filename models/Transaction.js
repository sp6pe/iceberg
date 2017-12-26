var bookshelf = require('../config/bookshelf');
const Block = require('./Block')
const TransactionReceipt = require('./TransactionReceipt')

var Transaction = bookshelf.Model.extend({
  tableName: 'transactions',
  hasTimestamps: true,

  block: function() {
    return this.belongTo(Block);
  },

  transactionReceipts: function() {
    return this.hasOne(TransactionReceipt);
  }
});

module.exports = Transaction;