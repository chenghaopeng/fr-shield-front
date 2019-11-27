import React from "react";
import styles from "./index.module.less";
import { withRouter } from "react-router"
import FlatButton from "../FlatButton/FlatButton";
import { Input, message } from "antd";
import { logout } from "../../services/apiHTTP";

class Frame extends React.Component {
  constructor(props) {
    super(props);
    if (!window.sessionStorage.token && this.props.title !== "个人中心" && this.props.title) this.props.history.push("/user");
  }
  handleSearch = (e) => {
    if (e.keyCode === 13) {
      const stock = e.target.value.trim();
      if (stock === "") {
        message.error("请输入股票名称或代码！");
        return;
      }
      this.props.history.push("/analysis/" + stock);
      if (this.props.that) this.props.that.refresh(stock);
    }
  }
  handleLogout = () => {
    const hide = message.loading("正在退出...", 0);
    logout().then(res => {
      hide();
      if (res.code === 0) {
        message.success("退出登录成功！");
        window.sessionStorage.clear();
        this.props.history.push("/");
        this.props.history.push("/user");
      }
      else {
        message.error("退出登录失败！");
      }
    });
  }
  render() {
    document.title = "FR Shield";
    if (this.props.title) document.title += " " + this.props.title;
    return (
      <div className={styles.whole}>
        <div className={styles.header}>
          <div className={styles.title}>
            FR Shield
          </div>
          <div className={styles.navigator}>
            <FlatButton text="首 页" href="/" />
            {window.sessionStorage.token ? <FlatButton text="股票浏览" href="/stocks" /> : ""}
            {window.sessionStorage.token ? <FlatButton text="用户论坛" href="/forum" /> : ""}
            <FlatButton text={window.sessionStorage.token ? "个人中心" : "登录"} href="/user" />
            {window.sessionStorage.token ? <FlatButton text="登出" onClick={this.handleLogout} /> : ""}
          </div>
        </div>
        {window.sessionStorage.token ? 
          <div className={styles.searchBox}>
            <Input className={`${styles.defaultShadowBox} ${styles.searchText}`} placeholder="搜索股票名称或代码.." onKeyDown={this.handleSearch} />
          </div>
        : ""}
        <div className={styles.content}>
          {this.props.node}
        </div>
      </div>
    );
  }
}

export default withRouter(Frame);