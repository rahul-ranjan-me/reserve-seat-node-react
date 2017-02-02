import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import allReducers from './reducers';
import Layout from './layout';
import ChooseSeat from './components/chooseSeat';
import Inventory from './components/inventory';
import Login from './components/login';
import Register from './components/register';

const store = createStore(allReducers);

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
            <Route path="/" component={Layout}>
                <IndexRoute component={ChooseSeat} />
                <Route path="register" component={Register} />
                <Route path="login" component={Login} />
                <Route path="chooseSeat" component={ChooseSeat} />
                <Route path="inventory" component={Inventory} />
            </Route>
        </Router>
	</Provider>
	, document.getElementById('root'));
