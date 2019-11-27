import React from "react";
import styles from "./index.module.less";
import Frame from "../../components/Frame";
import { withRouter } from "react-router"
import { Input, Icon, Button, message, Row, Col, Spin } from "antd";
import { login, register, footprint } from "../../services/apiHTTP";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loged: window.sessionStorage.token ? 1 : 0, login: {}, register: {}, fps: [], fp: false};
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
    if (!form.username || !form.password) {
      message.error("请输入用户名和密码！");
      return;
    }
    const hide = message.loading("正在登录...", 0);
    login({username: form.username, password: form.password}).then(res => {
      hide();
      if (res.code === 0) {
        message.success("欢迎回来，" + res.data.username + "！");
        window.sessionStorage.token = res.data.token;
        window.sessionStorage.username = res.data.username;
        this.setState({...this.state, loged: 1});
      }
      else {
        message.error("用户名或密码错误！");
      }
    });
  }
  handleRegister = () => {
    const form = this.state.register;
    if (!form.username || !form.password || !form.repeat ) {
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
    const Login = (
      <div className={`${styles.defaultBox} ${styles.loginregister}`}>
        <div className={styles.defaultTitle}>登 录</div>
        <Input name="username" prefix={<Icon type="user"/>} placeholder="用户名" onChange={this.handleLoginChange} style={inputStyle} />
        <Input name="password" prefix={<Icon type="lock"/>} type="password" placeholder="密码" onChange={this.handleLoginChange} style={inputStyle} />
        <Button type="primary" htmlType="submit" onClick={this.handleLogin} style={inputStyle}>登录</Button>
        <Button onClick={() => this.setState({...this.state, loged: -1})} style={inputStyle}>注册</Button>
      </div>
    );
    const Register = (
      <div className={`${styles.defaultBox} ${styles.loginregister}`}>
        <div className={styles.defaultTitle}>注 册</div>
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
    let component;
    if (this.state.loged === 1) {
      footprint().then(res => {
        if (res.code === 0) {
          this.setState({...this.state, fp: true, fps: res.data.footprints});
        }
      });
      component = (
        <div className={styles.whole}>
          <Row className={styles.defaultRow}>
            <Col span={24} className={`${styles.defaultBox} ${styles.hello}`}>
              {window.sessionStorage.username}，您好！
            </Col>
          </Row>
          <Row className={styles.defaultRow}>
            <Col span={12} className={styles.defaultBox}>
              <div className={styles.defaultTitle}>
                足迹
              </div>
              <div className={styles.footprints}>
                {this.state.fp ? this.state.fps.map((item, index) => {
                  return (
                    <div className={styles.footprint} key={index}>
                      {item}
                    </div>
                  );
                }) : <Spin size="large" />}
              </div>
            </Col>
            <Col span={11} offset={1} className={styles.defaultBox}>
              <div className={styles.defaultTitle}>
                修改密码
              </div>
            </Col>
          </Row>
        </div>
      );
    }
    else component = (
      <div className={styles.whole}>
        <this.LoginRegister />
      </div>
    );
    return <Frame node={component} title="个人中心" />
  }
}

export default withRouter(User);