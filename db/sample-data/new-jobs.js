var faker = require('faker');

function newJobs(company_id, quantity) {
	var jobs = [];

	for (var i = 0; i < quantity; i++) {
		var job = {
			company_id: company_id,
			customer: {
				name: faker.name.firstName() + ' ' + faker.name.lastName()
			},
			job_address: {
				street: faker.address.streetAddress()
			}
		};

		jobs.push(job);
	}

	return jobs;
}

module.exports = newJobs;