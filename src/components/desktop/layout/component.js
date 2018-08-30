import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from '../../../../src/components/desktop/navbar/component';
import JobNewContainer from '../../../../src/components/shared/jobs/new/container';
import JobEditContainer from '../../../../src/components/shared/jobs/edit/container';
import JobListContainer from '../../../../src/components/shared/jobs/list/container';

class LayoutDesktop extends Component {

	render() {
		return (
			<Fragment>
				<Navbar/>
				<Switch>
					<Route path="/jobs/new" component={JobNewContainer}/>
					<Route path="/jobs/:id/edit" component={JobEditContainer}/>
					<Route path="/jobs" component={JobListContainer}/>
					<Route path="/component" render={() => (
						<div className="container">Component Placeholder</div>
					)}/>
				</Switch>
			</Fragment>
		)
	}

}

export default LayoutDesktop;