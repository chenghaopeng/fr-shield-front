import React, { Component } from "react";
import styles from "./index.module.less";
import { Link, withRouter } from "react-router-dom"

import IosHome from "react-ionicons/lib/IosHome";
import IosExit from "react-ionicons/lib/IosExit";

class Header extends Component {
  toHome = () => {
    this.props.history.push("/");
  }
  toLogin = () => {
    this.props.history.push("/login");
  }
  render() {
    return (
      <div className={styles.header}>
        <IosHome className={styles.home} fontSize="3em" color="rgb(90, 86, 80)" onClick={this.toHome}/>
        <div className={styles.title}>{this.props.title}</div>
        <IosExit className={styles.logout} fontSize="3em" color="rgb(90, 86, 80)" onClick={this.toLogin}/>
      </div>
    );
  }
}

export default withRouter(Header);