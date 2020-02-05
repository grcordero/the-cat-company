import React from 'react';
import {Home, Single} from './Page';

import {
	BrowserRouter as Router,
	Switch,
	Route
  } from 'react-router-dom';

function App() {
	return (
		<Router>
			<div className="app">
				<Switch>
					<Route path="/:id">
						<Single />
					</Route>

					<Route path="/">
						<Home />
					</Route>					
				</Switch>
			</div>
		</Router>
	);
}

export default App;
