import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import LayoutDesktopContainer from '../../../../src/components/desktop/layout/container';
import GraphiQLContainer from '../../../../src/components/desktop/graphiql/container';
import '../../../../vendor/bootstrap.min.css';
import './component.scss';

class AppDesktop extends Component {

	render() {
		return (
			<Provider store={this.props.store}>
				<BrowserRouter basename="/app">
					<Switch>
						<Route path="/query" component={GraphiQLContainer}/>
						<Route path="/" component={LayoutDesktopContainer}/>
					</Switch>
				</BrowserRouter>
			</Provider>
		)
	}

}

export default AppDesktop;