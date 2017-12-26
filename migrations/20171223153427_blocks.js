exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('blocks', function(table) {
      table.increments('id').unsigned().primary();
      table.string('difficulty');
      table.string('extra_data');
      table.integer('gas_limit');
      table.integer('gas_used');
      table.string('hash');
      table.json('logs_bloom');
      table.string('miner', 40);
      table.string('mix_hash');
      table.string('nonce');
      table.integer('number');
      table.string('parent_hash', 64);
      table.string('receipts_root', 64);
      table.string('sha_uncles', 64);
      table.integer('size');
      table.string('state_root', 64);
      table.integer('block_timestamp');
      table.string('total_difficulty');
      table.string('transactions_root');
      table.json('uncles');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('blocks')
  ])
};
