var bookshelf = require('../config/bookshelf');
import Transaction from './Transaction'

var Block = bookshelf.Model.extend({
  tableName: 'blocks',
  hasTimestamps: true,

  transactios: function() {
    return this.hasMany(Transaction);
  }
});

module.exports = Block;
