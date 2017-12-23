exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('logs', function(table) {
      table.increments('id').unsigned().primary();
      table.string('address', 40);
      table.json('topics');
      table.string('data');
      table.integer('log_index');
      table.boolean('removed');
      table.string('log_id');
      table.integer('transaction_receipts_id').unsigned().references('transaction_receipts.id')
      table.timestamps()
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('logs')
  ])
};
