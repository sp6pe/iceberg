var bookshelf = require('../config/bookshelf');
import TransactionReceipt from './TransactionReceipt'

var Log = bookshelf.Model.extend({
  tableName: 'logs',
  hasTimestamps: true,

  transactionReceipts: function() {
    return this.belongTo(TransactionReceipt);
  }
});

module.exports = Log;