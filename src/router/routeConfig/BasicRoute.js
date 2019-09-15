import React from "react";
import { Route } from "react-router-dom";

import Login from "../LoginRegister/Login";
import Register from "../LoginRegister/Register";
import Main from "../Main";
import Analysis from "../Analysis";
import Information from "../Information";
import Personal from "../Personal";
import Survey from "../Survey";
import Forum from "../Forum";

export default [
	<Route component={ Login } exact path='/login'/>,
	<Route component={ Register } exact path='/register'/>,
	<Route component={ Main } exact path='/'/>,
	<Route component={ Analysis } exact path="/analysis/:stock"/>,
	<Route component={ Analysis } exact path="/analysis/:stock/:nav"/>,
	<Route component={ Information } exact path="/information"/>,
	<Route component={ Personal } exact path="/personal"/>,
	<Route component={ Survey } exact path="/survey"/>,
	<Route component={ Forum } exact path="/forum"/>,
];