exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('blocks', function(table) {
      table.increments('id').unsigned().primary();
      table.decimal('difficulty');
      table.string('extra_data');
      table.decimal('gas_limit');
      table.decimal('gas_used');
      table.string('hash');
      table.string('logs_bloom');
      table.string('miner', 20);
      table.string('mix_hash');
      table.string('nonce');
      table.integer('number');
      table.string('parent_hash', 32);
      table.string('receipts _root', 32);
      table.string('sha_uncles', 32);
      table.integer('size');
      table.string('state_r0ot', 32);
      table.integer('block_timestamp');
      table.string('total_difficulty');
      table.string('trsnactions_root');
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
