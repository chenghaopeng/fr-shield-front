import React from "react";
import { Route } from "react-router-dom";

import Login from "../LoginRegister/Login"
import Register from "../LoginRegister/Register"
import Main from "../Main"

export default [
	<Route component={ Login } exact path='/login'/>,
	<Route component={ Register } exact path='/register'/>,
	<Route component={ Main } exact path='/'/>,
];