import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from '../../../../src/components/mobile/navbar/component';
import TodoNewContainer from '../../../../src/components/shared/todos/new/container';
import TodoEditContainer from '../../../../src/components/shared/todos/edit/container';
import TodoListContainer from '../../../../src/components/shared/todos/list/container';
import '../../../../vendor/bootstrap.min.css';

class AppMobile extends Component {

	render() {
		return (
			<Fragment>
				<Switch>
					<Route path="/todos/new" component={TodoNewContainer}/>
					<Route path="/todos/:id/edit" component={TodoEditContainer}/>
					<Route path="/todos" component={TodoListContainer}/>
				</Switch>
				<Navbar/>
			</Fragment>
		)
	}

}

export default AppMobile;