var faker = require('faker');

function newResources(company_id, quantity) {
	var resources = [];

	for (var i = 0; i < quantity; i++) {
		var resource = {
			company_id: company_id,
			name: faker.name.firstName()
		};

		resources.push(resource);
	}

	return resources;
}

module.exports = newResources;