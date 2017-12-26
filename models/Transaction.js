var bookshelf = require('../config/bookshelf');
var Block = require('./Block');
var TransactionReceipt = require('./TransactionReceipt');

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
