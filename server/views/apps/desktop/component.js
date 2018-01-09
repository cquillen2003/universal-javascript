import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from '../../../../src/components/desktop/navbar/component';
import TodoNew from '../../../../src/components/shared/todos/new/component';
import TodoList from '../../../../src/components/shared/todos/list/component';
import '../../../../vendor/bootstrap.min.css';
import './component.scss';

class AppDesktop extends Component {

	render() {
		return (
			<Fragment>
				<Navbar/>
				<Switch>
					<Route path="/todos/new" component={TodoNew}/>
					<Route path="/todos" component={TodoList}/>
				</Switch>
			</Fragment>
		)
	}

}

export default AppDesktop;