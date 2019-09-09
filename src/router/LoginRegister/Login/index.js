import React, { Component } from "react";
import styles from "../index.module.less";
import { Link } from "react-router-dom";

import { login } from "../../../services/apiHTTP";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username: "", password: ""};
  }

  handleInputChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = e => {
    e.preventDefault();
    //alert(JSON.stringify(this.state));
    const values = this.state;
    if (values.username.length === 0 || values.password.length === 0) {
      alert("请输入用户名和密码！");
    }
    else {
      login(values).then(res => {
        if (res.code === 0) {
          window.localStorage.username = res.data.username;
          this.props.history.push("/");
        }
        else {
          alert("用户名或密码错误！");
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