import React from "react";
import styles from "./index.module.less";
import Frame from "../../components/Frame";
import { withRouter } from "react-router"
import { Input, Icon, Button, message } from "antd";
import { login, register } from "../../services/apiHTTP";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loged: window.localStorage.token ? 1 : 0, login: {}, register: {}};
  }
  handleLoginChange = (e) => {
    let state = this.state;
    state.login[e.target.name] = e.target.value;
    this.setState(state);
  }
  handleRegisterChange = (e) => {
    let state = this.state;
    state.register[e.target.name] = e.target.value;
    this.setState(state);
  }
  handleLogin = () => {
    const form = this.state.login;
    if (form.username === "" || form.password === "") {
      message.error("请输入用户名和密码！");
      return;
    }
    const hide = message.loading("正在登录...", 0);
    login({username: form.username, password: form.password}).then(res => {
      hide();
      if (res.code === 0) {
        message.success("欢迎回来，" + res.data.username + "！");
        this.setState({...this.state, loged: 1});
        window.localStorage.token = res.data.token;
      }
      else {
        message.error("用户名或密码错误！");
      }
    });
  }
  handleRegister = () => {
    const form = this.state.register;
    if (form.username === "" || form.password === "" || form.repeat === "") {
      message.error("请输入用户名和密码！");
      return;
    }
    if (form.password !== form.repeat) {
      message.error("请确认两次密码输入一致！");
      return;
    }
    const hide = message.loading("正在注册...", 0);
    register({username: form.username, password: form.password}).then(res => {
      hide();
      if (res.code === 0) {
        message.success("注册成功！");
        this.setState({...this.state, loged: 0});
      }
      else {
        message.error("用户名已经注册！");
      }
    });
  }
  LoginRegister = () => {
    const inputStyle = {
      width: "100%",
      margin: ".5em 0"
    };
    const titleStyle = {
      fontSize: "1.3em",
      marginBottom: ".5em"
    }
    const Login = (
      <div className={`${styles.defaultShadowBox} ${styles.loginregister}`}>
        <div style={titleStyle}>登 录</div>
        <Input name="username" prefix={<Icon type="user"/>} placeholder="用户名" onChange={this.handleLoginChange} style={inputStyle} />
        <Input name="password" prefix={<Icon type="lock"/>} type="password" placeholder="密码" onChange={this.handleLoginChange} style={inputStyle} />
        <Button type="primary" htmlType="submit" onClick={this.handleLogin} style={inputStyle}>登录</Button>
        <Button onClick={() => this.setState({...this.state, loged: -1})} style={inputStyle}>注册</Button>
      </div>
    );
    const Register = (
      <div className={`${styles.defaultShadowBox} ${styles.loginregister}`}>
        <div style={titleStyle}>注 册</div>
        <Input name="username" prefix={<Icon type="user"/>} placeholder="用户名" onChange={this.handleLoginChange} style={inputStyle} />
        <Input name="password" prefix={<Icon type="lock"/>} type="password" placeholder="密码" onChange={this.handleLoginChange} style={inputStyle} />
        <Input name="repeat" prefix={<Icon type="lock"/>} type="password" placeholder="重复密码" onChange={this.handleLoginChange} style={inputStyle} />
        <Button type="primary" htmlType="submit" onClick={this.handleRegister} style={inputStyle}>注册</Button>
        <Button onClick={() => this.setState({...this.state, loged: 0})} style={inputStyle}>登录</Button>
      </div>
    );
    return this.state.loged === 0 ? Login : Register;
  }
  render() {
    const component = (
      <div className={styles.whole}>
        {
          this.state.loged === 1 ?
            <div className={styles.defaultShadowBox}>
              
            </div>
          : <this.LoginRegister />
        }
      </div>
    );
    return <Frame node={component} title="个人中心" />
  }
}

export default withRouter(User);