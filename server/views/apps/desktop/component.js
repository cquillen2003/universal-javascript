import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from '../../../../src/components/desktop/navbar/component';
import TodoNewContainer from '../../../../src/components/shared/todos/new/container';
import TodoEditContainer from '../../../../src/components/shared/todos/edit/container';
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
					<Route path="/todos/:id/edit" component={TodoEditContainer}/>
					<Route path="/todos" component={TodoListContainer}/>
					<Route path="/component" render={() => (
						<div style={{ padding: '1rem 2rem' }}>Component Placeholder</div>
					)}/>
				</Switch>
			</Fragment>
		)
	}

}

export default AppDesktop;