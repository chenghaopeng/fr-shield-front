import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import BasicRoute from './RouteConfig/BasicRoute';

const routeList = [ BasicRoute ];

export default function () {
	return (
		<BrowserRouter>
			<Switch>
				{ routeList }
			</Switch>
		</BrowserRouter>
	);
}