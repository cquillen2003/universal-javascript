import React, { Component } from 'react';
import LayoutDesktop from './component';

class LayoutDesktopContainer extends Component {

	componentDidMount() {
		this.subscribe();
	}
	
	//Use Server Sent Events (SSE) for real-time database updates
	subscribe() {
		var source = new EventSource('/events');

		source.onmessage = (event) => {
			var data = JSON.parse(event.data);
			console.log('SSE received', data);
		}

		source.onerror = (error) => {
			console.log('SSE error', error);
		}
	}

	render() {
		return (
			<LayoutDesktop/>
		)
	}
}

export default LayoutDesktopContainer;