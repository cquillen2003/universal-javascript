import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ApolloClient from "apollo-boost";
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import LayoutDesktopContainer from '../../../../src/components/desktop/layout/container';
import GraphiQLContainer from '../../../../src/components/desktop/graphiql/container';
import '../../../../vendor/bootstrap.min.css';
import './component.scss';

class AppDesktop extends Component {
	
	constructor(props) {
		super(props);

		this.client = new ApolloClient();
	}

	render() {
		return (
			<ApolloProvider client={this.client}>
				<Provider store={this.props.store}>
					<BrowserRouter basename="/app">
						<Switch>
							<Route path="/query" component={GraphiQLContainer}/>
							<Route path="/" component={LayoutDesktopContainer}/>
						</Switch>
					</BrowserRouter>
				</Provider>
			</ApolloProvider>
		)
	}

}

export default AppDesktop;