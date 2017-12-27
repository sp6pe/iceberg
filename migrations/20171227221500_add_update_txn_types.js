exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.table('transactions', function(table) {
			table.string('block_hash');
			table.string('from', 42);
			table.decimal('gas_price');
			table.string('hash');
			table.string('to', 42);
		})
	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.table('transactions', function(table) {
			table.dropColumns('block_hash', 'from', 'to', 'hash', 'gas_price');
		})
	]);
};
