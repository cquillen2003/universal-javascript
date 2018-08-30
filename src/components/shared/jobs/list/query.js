import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import JobList from './component';

var GET_JOBS = gql`{
	jobs {
		customer {
			name
		}
		job_address {
			street
		}
	}
}`;

var JobListContainer = () => (
	<Query query={GET_JOBS}>
		{({ loading, error, data }) => {
			if (loading) return "Loading...";
			if (error) return `Error! ${error.message}`;

			var jobs = data.jobs;

			return <JobList jobs={jobs}/>
		}}
	</Query>
);

export default JobListContainer;