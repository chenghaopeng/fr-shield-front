import React, { Component } from "react";
import styles from "./index.module.less";
import { withRouter } from "react-router-dom"

import IosHome from "react-ionicons/lib/IosHome";
import IosExit from "react-ionicons/lib/IosExit";

import { logout } from "../../services/apiHTTP";

class Header extends Component {
  componentWillMount() {
    if (!window.localStorage.username) {
      this.props.history.push("/login");
    }
  }

  toHome = () => {
    this.props.history.push("/");
  }

  toLogin = () => {
    logout().then(res => {
      if (res.code === 0) {
        window.localStorage.removeItem("username");
        this.props.history.push("/login");
      }
    });
  }
  
  render() {
    return (
      <div className={styles.header}>
        <IosHome className={styles.home} fontSize="3em" color="rgb(90, 86, 80)" onClick={this.toHome}/>
        <div className={styles.title}>FR Shield {this.props.title}</div>
        <IosExit className={styles.logout} fontSize="3em" color="rgb(90, 86, 80)" onClick={this.toLogin}/>
      </div>
    );
  }
}

export default withRouter(Header);