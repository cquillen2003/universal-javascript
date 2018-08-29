import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from '../../../../src/components/desktop/navbar/component';
import JobNewContainer from '../../../../src/components/shared/jobs/new/container';
import JobEditContainer from '../../../../src/components/shared/jobs/edit/container';
import JobListContainer from '../../../../src/components/shared/jobs/list/container';
import GraphiQLContainer from '../../../../src/components/desktop/graphiql/container';
import '../../../../vendor/bootstrap.min.css';
import './component.scss';

class AppDesktop extends Component {

	render() {
		return (
			<Fragment>
				<Route render={(props) => {
					//Work around for rendering GraphiQL full-screen until Layout component added
					if (props.location.pathname !== '/query') {
						return (
							<Navbar/>
						)
					}
					return null;
				}}/>
				<Switch>
					<Route path="/jobs/new" component={JobNewContainer}/>
					<Route path="/jobs/:id/edit" component={JobEditContainer}/>
					<Route path="/jobs" component={JobListContainer}/>
					<Route path="/component" render={() => (
						<div style={{ padding: '1rem 2rem' }}>Component Placeholder</div>
					)}/>
					<Route path="/query" component={GraphiQLContainer}/>
				</Switch>
			</Fragment>
		)
	}

}

export default AppDesktop;