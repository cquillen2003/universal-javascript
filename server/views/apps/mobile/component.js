import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from '../../../../src/components/mobile/navbar/component';
import JobNewContainer from '../../../../src/components/shared/jobs/new/container';
import JobEditContainer from '../../../../src/components/shared/jobs/edit/container';
import JobListContainer from '../../../../src/components/shared/jobs/list/container';
import '../../../../vendor/bootstrap.min.css';

class AppMobile extends Component {

	render() {
		return (
			<Fragment>
				<Switch>
					<Route path="/jobs/new" component={JobNewContainer}/>
					<Route path="/jobs/:id/edit" component={JobEditContainer}/>
					<Route path="/jobs" component={JobListContainer}/>
				</Switch>
				<Navbar/>
			</Fragment>
		)
	}

}

export default AppMobile;