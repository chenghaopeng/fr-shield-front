import React, { Component } from "react";
import styles from "../index.module.less";
import { Link } from "react-router-dom";
import { message } from "antd";

import { register } from "../../../services/apiHTTP";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {username: "", password: "", repeat: ""};
  }

  handleInputChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = e => {
    e.preventDefault();
    const values = this.state;
    if (values.username.length === 0 || values.password.length === 0 || values.repeat === 0) {
      message.error("请输入用户名、密码以及重复密码！");
    }
    else if (values.password !== values.repeat) {
      message.error("两次输入的密码不一致！");
    }
    else {
      register({
        username: values.username,
        password: values.password
      }).then(res => {
        if (res.code === 0) {
          message.success("注册成功！");
          this.props.history.push("/login");
        }
        else {
          message.error("该用户名已被注册！");
        }
      });
    }
  }
  
  render() {
    return (
      <div className={styles.whole}>
        <div className={styles.wrapper}>
          <div className={styles.title}>
            欢迎注册 FR Shield
          </div>
          <form className={styles.form} onSubmit={this.handleSubmit}>
            <input name="username" type="text" placeholder="用户名" autoComplete="off" onChange={this.handleInputChange}/>
            <input name="password" type="password" placeholder="密码" autoComplete="off" onChange={this.handleInputChange}/>
            <input name="repeat" type="password" placeholder="重复密码" autoComplete="off" onChange={this.handleInputChange}/>
            <button name="submit">注 册</button>
          </form>
          <div className={styles.title}>
            已有帐号？<Link to="/login">点此登录</Link>
          </div>
        </div>
      </div>
    );
  }
}