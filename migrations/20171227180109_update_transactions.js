exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.table('transactions', function(table) {
			table.dropColumns('block_hash', 'from', 'to', 'hash', 'gas_price');
		})
	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.table('transactions', function(table) {
			table.string('block_hash', 64);
			table.string('from', 40);
			table.integer('gas_price');
			table.string('hash', 64);
			table.string('to', 40);
		})
	]);
};
