var bookshelf = require('../../config/bookshelf');
const EthTransaction = require('./EthTransaction');

var EthBlock = bookshelf.Model.extend({
  tableName: 'ethereum_blocks',
  hasTimestamps: true,

  transactions: function() {
    return this.hasMany(EthTransaction);
  }
});

module.exports = EthBlock;
