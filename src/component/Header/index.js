import React, { Component } from "react";
import styles from "./index.module.less";
import { withRouter } from "react-router-dom"

import IosHome from "react-ionicons/lib/IosHome";
import IosExit from "react-ionicons/lib/IosExit";
import { Modal } from "antd";

import { logout } from "../../services/apiHTTP";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {logoutConfirm: {visible: false, loading: false}};
  }

  showLogoutConfirm = () => {
    this.setState({...this.state, logoutConfirm: {visible: true, loading: false}});
  }

  handleLogout = () => {
    this.setState({...this.state, logoutConfirm: {visible: true, loading: true}});
    this.toLogin();
  }

  handleLogoutCancel = () => {
    this.setState({...this.state, logoutConfirm: {visible: false, loading: false}});
  }

  componentWillMount() {
    if (!window.sessionStorage.username) {
      this.props.history.push("/login");
    }
  }

  toHome = () => {
    this.props.history.push("/");
  }

  toLogin = () => {
    logout().then(res => {
      if (res.code === 0) {
        window.sessionStorage.removeItem("username");
        this.props.history.push("/login");
      }
    });
  }
  
  render() {
    const { logoutConfirm } = this.state;
    document.title = "FR Shield" + (this.props.title ? " " + this.props.title : "");
    return (
      <div className={styles.header}>
        <IosHome className={styles.home} fontSize="10vh" color="rgb(90, 86, 80)" onClick={this.toHome}/>
        <div className={styles.title}>FR Shield {this.props.title}</div>
        <IosExit className={styles.logout} fontSize="10vh" color="rgb(90, 86, 80)" onClick={this.showLogoutConfirm}/>
        <Modal
          title="登出"
          visible={logoutConfirm.visible}
          onOk={this.handleLogout}
          confirmLoading={logoutConfirm.loading}
          onCancel={this.handleLogoutCancel}
          okText={"确定"}
          cancelText={"取消"}
          bodyStyle={{fontSize: "2.5vh"}}
        >
          您确定要登出 FR Shield 吗？
        </Modal>
      </div>
    );
  }
}

export default withRouter(Header);