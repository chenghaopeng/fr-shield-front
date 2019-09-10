import React, { Component } from "react";
import styles from "./index.module.less";
import { withRouter } from "react-router-dom";
import { message } from "antd";

import WithHeader from "../../component/WithHeader";
import { footprint } from "../../services/apiHTTP";
import { password } from "../../services/apiHTTP";

class Personal extends Component {
  constructor(props) {
    super(props);
    this.state = {fp: {show: 0, data: []}, pw: {show: 0, oldPassword: "", password: "", repeat: ""}};
  }

  componentWillMount() {
    footprint().then(res => {
      if (res.code === 0) {
        this.setState({...this.state, fp: {...this.state.fp, data: res.data.footprints}});
      }
      else {
        this.setState({...this.state, fp: {...this.state.fp, data: []}});
      }
    });
  }

  showFootprint = () => {
    this.setState({...this.state, fp: {...this.state.fp, show: 1 - this.state.fp.show}});
  }

  showPassword = () => {
    this.setState({...this.state, pw: {...this.state.pw, show: 1 - this.state.pw.show}});
  }

  getFootprint = () => {
    return (
      <div className={styles.fpcontainer}>
        {this.state.fp.data.length === 0 ? <div className={styles.fp} style={{width: "80%"}}>暂时没有足迹</div> : this.state.fp.data.map(name => {
          return (
            <div className={styles.fp}>
              {name}
            </div>
          );
        })}
      </div>
    );
  }

  getPassword = () => {
    return (
      <form className={styles.pwcontainer} onSubmit={this.handleSubmit}>
        <input name="password" type="password" placeholder="新密码" autoComplete="off" value={this.state.pw.password} onChange={this.handleInputChange}/>
        <input name="repeat" type="password" placeholder="重复新密码" autoComplete="off" value={this.state.pw.repeat} onChange={this.handleInputChange}/>
        <input name="oldPassword" type="password" placeholder="旧密码" autoComplete="off" value={this.state.pw.oldPassword} onChange={this.handleInputChange}/>
        <button name="submit">修 改</button>
      </form>
    );
  }

  handleInputChange = (e) => {
    this.setState({...this.state, pw: {...this.state.pw, [e.target.name]: e.target.value}});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const values = this.state.pw;
    if (values.oldPassword.length === 0 || values.password.length === 0 || values.repeat.length === 0) {
      message.error("请输入旧密码、密码以及重复密码！");
    }
    else if (values.password !== values.repeat) {
      message.error("两次输入的新密码不一致！");
    }
    else {
      password({
        oldpassword: values.oldPassword,
        newpassword: values.password
      }).then(res => {
        if (res.code === 0) {
          message.success("密码修改成功！");
        }
        else {
          message.error("密码错误，修改失败！");
        }
        this.setState({...this.state, pw: {show: 0, oldPassword: "", password: "", repeat: ""}});
      });
    }
  }
  
  render() {
    return (
      <div className={styles.whole}>
        <div className={`${styles.fold} ${this.state.pw.show === 1 ? styles.show : ''}`} onClick={this.showPassword}>
          修改密码
        </div>
        {this.state.pw.show === 1 ? this.getPassword() : ""}
        <div className={`${styles.fold} ${this.state.fp.show === 1 ? styles.show : ''}`} onClick={this.showFootprint}>
          足迹
        </div>
        {this.state.fp.show === 1 ? this.getFootprint() : ""}
      </div>
    );
  }
}

export default WithHeader(withRouter(Personal), "个人中心");