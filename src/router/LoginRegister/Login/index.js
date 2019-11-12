import React, { Component } from "react";
import styles from "../index.module.less";
import { Link } from "react-router-dom";
import { message } from "antd";

import { login } from "../../../services/apiHTTP";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username: "", password: ""};
    document.title = "FR Shield 登录";
  }

  handleInputChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = e => {
    e.preventDefault();
    const values = this.state;
    if (values.username.length === 0 || values.password.length === 0) {
      message.error("请输入用户名和密码！");
    }
    else {
      const hide = message.loading("正在登录...", 0);
      login(values).then(res => {
        hide();
        if (res.code === 0) {
          window.sessionStorage.token = res.data.token;
          window.sessionStorage.mark = parseFloat(res.data.mark).toFixed(6);
          if (window.sessionStorage.mark < 0) {
            this.props.history.push("/survey");
            message.success(res.data.username + "，欢迎您来！");
          }
          else{
            this.props.history.push("/");
            message.success(res.data.username + "，欢迎回来！");
          }
        }
        else {
          message.error("用户名或密码错误！");
        }
      });
    }
  }
  
  render() {
    return (
      <div className={styles.whole}>
        <div className={styles.wrapper}>
          <div className={styles.title}>
            欢迎来到 FR Shield ，请先登录
          </div>
          <form className={styles.form} onSubmit={this.handleSubmit}>
            <input name="username" type="text" placeholder="用户名" autoComplete="off" onChange={this.handleInputChange}/>
            <input name="password" type="password" placeholder="密码" autoComplete="off" onChange={this.handleInputChange}/>
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