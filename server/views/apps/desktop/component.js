import React, { Component, Fragment } from 'react';
import Navbar from '../../../../src/components/desktop/navbar/component';
import '../../../../vendor/bootstrap.min.css';
import './component.scss';

class AppDesktop extends Component {

	render() {
		return (
			<Fragment>
				<Navbar/>
			</Fragment>
		)
	}

}

export default AppDesktop;