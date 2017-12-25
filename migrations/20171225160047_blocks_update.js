exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.table('blocks', function(table) {
			table.renameColumn('state_r0ot', 'state_root');
			table.renameColumn('trsnactions_root', 'transactions_root');
		})
	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.table('blocks', function(table) {
			table.renameColumn('state_root', 'state_r0ot');
			table.renameColumn('transactions_root', 'trsnactions_root');
		})
	]);
};
