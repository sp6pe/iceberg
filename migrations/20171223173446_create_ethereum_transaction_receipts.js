exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('ethereum_transaction_receipts', function(table) {
      table.increments('id').unsigned().primary();
      table.string('contract_address', 42);
      table.integer('cumulative_gas_used');
      table.integer('gas_used');
      table.text('logs_bloom');
      table.enum('status', ['0x0', '0x1']);
      table.integer('transaction_id').unsigned().references('ethereum_transactions.id');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('ethereum_transaction_receipts')]);
};
