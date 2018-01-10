import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from '../../../../src/components/desktop/navbar/component';
import TodoNewContainer from '../../../../src/components/shared/todos/new/container';
import TodoListContainer from '../../../../src/components/shared/todos/list/container';
import '../../../../vendor/bootstrap.min.css';
import './component.scss';

class AppDesktop extends Component {

	render() {
		return (
			<Fragment>
				<Navbar/>
				<Switch>
					<Route path="/todos/new" component={TodoNewContainer}/>
					<Route path="/todos" component={TodoListContainer}/>
				</Switch>
			</Fragment>
		)
	}

}

export default AppDesktop;