exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('ethereum_logs', function(table) {
      table.increments('id').unsigned().primary();
      table.string('address', 42);
      table.json('topics');
      table.text('data');
      table.integer('log_index');
      table.boolean('removed');
      table.string('log_id');
      table.integer('transaction_receipts_id').unsigned().references('ethereum_transaction_receipts.id')
      table.timestamps()
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('ethereum_logs')
  ])
};
