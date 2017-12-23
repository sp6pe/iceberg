var bookshelf = require('../config/bookshelf');
import Transaction from './Transaction'
import Log from './Log'

var TransactionReceipt = bookshelf.Model.extend({
  tableName: 'transaction_receipts',
  hasTimestamps: true,

  transaction: function() {
    return this.belongTo(Transaction);
  }

  logs: function() {
    return this.hasMany(Log);
  }

});

module.exports = TransactionReceipt;