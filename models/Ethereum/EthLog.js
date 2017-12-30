var bookshelf = require('../../config/bookshelf');
const EthTransactionReceipt = require('./EthTransactionReceipt');

var EthLog = bookshelf.Model.extend({
	tableName: 'ethereum_logs',
	hasTimestamps: true,

	transactionReceipts: function() {
		return this.belongTo(EthTransactionReceipt);
	}
});

module.exports = EthLog;
