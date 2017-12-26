var bookshelf = require('../config/bookshelf');
const TransactionReceipt = require('./TransactionReceipt');

var Log = bookshelf.Model.extend({
	tableName: 'logs',
	hasTimestamps: true,

	transactionReceipts: function() {
		return this.belongTo(TransactionReceipt);
	}
});

module.exports = Log;
