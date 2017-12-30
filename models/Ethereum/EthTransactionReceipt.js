var bookshelf = require('../../config/bookshelf');
const EthTransaction = require('./EthTransaction');
const EthLog = './EthLog';
var EthTransactionReceipt = bookshelf.Model.extend({
  tableName: 'ethereum_transaction_receipts',
  hasTimestamps: true,

  transaction: function() {
    return this.belongTo(EthTransaction);
  },

  logs: function() {
    return this.hasMany(EthLog);
  }
});

module.exports = EthTransactionReceipt;
