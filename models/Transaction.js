var bookshelf = require('../config/bookshelf');
import Block from './Block'
import TransactionReceipt from './TransactionReceipt'

var Transaction = bookshelf.Model.extend({
  tableName: 'transactions',
  hasTimestamps: true,

  block: function() {
    return this.belongTo(Block);
  }

  transactionReceipts: function() {
    return this.hasOne(TransactionReceipt);
  }
});

module.exports = Transaction;