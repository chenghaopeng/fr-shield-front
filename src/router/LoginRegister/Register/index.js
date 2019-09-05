import React, { Component } from "react";
import styles from "../index.module.less";
import { Link } from "react-router-dom";

export default class Register extends Component {
  handleSubmit(e) {
    e.preventDefault();
    /*
      Register
    */
  }
  render() {
    return (
      <div className={styles.whole}>
        <div className={styles.wrapper}>
          <div className={styles.title}>
            欢迎注册 FR Shield
          </div>
          <form className={styles.form} onSubmit={this.handleSubmit}>
            <input name="username" type="text" placeholder="用户名" autoComplete="off"/>
            <input name="password" type="password" placeholder="密码" autoComplete="off"/>
            <input name="repeat" type="password" placeholder="重复密码" autoComplete="off"/>
            <input name="submit" type="submit" value="注 册"/>
          </form>
          <Link to="/login" className={styles.title}>
            已有帐号？点此登录
          </Link>
        </div>
      </div>
    );
  }
}