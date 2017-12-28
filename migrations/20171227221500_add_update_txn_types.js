exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.table('transactions', function(table) {
			table.text('block_hash');
			table.string('from', 42);
			table.bigInteger('gas_price');
			table.text('hash');
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
