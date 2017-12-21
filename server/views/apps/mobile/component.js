import React, { Component, Fragment } from 'react';
import Navbar from '../../../../src/components/mobile/navbar/component';
import '../../../../vendor/bootstrap.min.css';

class AppMobile extends Component {

	render() {
		return (
			<Fragment>
				<Navbar/>
			</Fragment>
		)
	}

}

export default AppMobile;