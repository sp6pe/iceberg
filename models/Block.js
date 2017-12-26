var bookshelf = require('../config/bookshelf');
const Transaction = require('./Transaction');

var Block = bookshelf.Model.extend({
	tableName: 'blocks',
	hasTimestamps: true,

	transactions: function() {
		return this.hasMany(Transaction);
	}
});

module.exports = Block;
