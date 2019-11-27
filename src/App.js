import React, { Component } from 'react';
import './App.less';
import RouteConfig from './router/index.route';

export default class App extends Component {
  render() {
    return <RouteConfig/>;
  }
}