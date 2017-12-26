exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('transactions', function(table) {
      table.increments('id').unsigned().primary();
      table.string('block_hash', 64);
      table.integer('block_number');
      table.string('from', 40);
      table.integer('gas');
      table.integer('gas_price');
      table.string('hash', 64);
      table.string('input');
      table.integer('nonce');
      table.string('to', 40);
      table.integer('transaction_index');
      table.string('value');
      table.string('v');
      table.string('r');
      table.string('s');
      table.integer('block_id').unsigned().references('blocks.id')
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('transactions')
  ])
};
