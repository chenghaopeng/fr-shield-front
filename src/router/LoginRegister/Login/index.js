import React, { Component } from "react";
import styles from "../index.module.less";
import { Link } from "react-router-dom";

export default class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    /*
      Login
    */
    this.props.history.push("/");
  }
  render() {
    return (
      <div className={styles.whole}>
        <div className={styles.wrapper}>
          <div className={styles.title}>
            欢迎来到 FR Shield ，请先登录
          </div>
          <form className={styles.form} onSubmit={this.handleSubmit}>
            <input name="username" type="text" placeholder="用户名" autoComplete="off"/>
            <input name="password" type="password" placeholder="密码" autoComplete="off"/>
            <button name="submit">登 录</button>
          </form>
          <div className={styles.title}>
            还没有帐号？<Link to="/register">点此注册</Link>
          </div>
        </div>
      </div>
    );
  }
}