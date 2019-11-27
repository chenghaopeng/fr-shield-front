import React from "react";
import { Route } from "react-router-dom";
import Main from "../Main";
import User from "../User";
import Analysis from "../Analysis";
import Forum from "../Forum";
import Stocks from "../Stocks";

export default [
	<Route component={ Main } exact path='/'/>,
	<Route component={ User } exact path='/user'/>,
	<Route component={ Analysis } exact path='/analysis/:stock'/>,
	<Route component={ Forum } exact path='/forum'/>,
	<Route component={ Stocks } exact path='/stocks'/>,
];