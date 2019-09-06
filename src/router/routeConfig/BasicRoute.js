import React from "react";
import { Route } from "react-router-dom";

import Login from "../LoginRegister/Login"
import Register from "../LoginRegister/Register"
import Main from "../Main"
import Analysis from "../Analysis"
import Information from "../Information"
import Bbs from "../Bbs"
import Personal from "../Personal"

export default [
	<Route component={ Login } exact path='/login'/>,
	<Route component={ Register } exact path='/register'/>,
	<Route component={ Main } exact path='/'/>,
	<Route component={ Analysis } exact path="/analysis/:stock"/>,
	<Route component={ Information } exact path="/information"/>,
	<Route component={ Bbs } exact path="/Bbs"/>,
	<Route component={ Personal } exact path="/Personal"/>,
];