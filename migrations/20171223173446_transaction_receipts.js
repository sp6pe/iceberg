exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('transaction_receipts', function(table) {
      table.increments('id').unsigned().primary();
      table.string('contract_address', 40);
      table.decimal('cumulative_gas_used');
      table.decimal('gas_used');
      table.string('logs_boom');
      table.enum('status', ['0x0','0x1']);
      table.string('root');
      table.integer('transaction_id').unsigned().references('transactions.id')
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('transaction_receipts')
  ])
};
