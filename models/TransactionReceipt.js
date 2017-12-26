var bookshelf = require('../config/bookshelf');
const Transaction = require ('./Transaction')
const Log = ('./Log')


var TransactionReceipt = bookshelf.Model.extend({
	tableName: 'transaction_receipts',
	hasTimestamps: true,

  transaction: function() {
    return this.belongTo(Transaction);
  },

  logs: function() {
    return this.hasMany(Log);
  }

module.exports = TransactionReceipt;
