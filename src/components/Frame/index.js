import React from "react";
import styles from "./index.module.less";
import { withRouter } from "react-router"
import FlatButton from "../FlatButton/FlatButton";
import { Input, message, Popover } from "antd";
import { logout } from "../../services/apiHTTP";
import { AssociateStock } from "../../utils/stocks";

class Frame extends React.Component {
  constructor(props) {
    super(props);
    if (!window.sessionStorage.token && this.props.title !== "个人中心" && this.props.title) this.props.history.push("/user");
    this.state = {stock: ""};
  }
  handleSearch = (e) => {
    if (e.keyCode === 13) {
      const stock = e.target.value.trim();
      if (stock === "") {
        message.error("请输入股票名称或代码！");
        return;
      }
      this.handleGoAnalysis(stock);
    }
  }
  handleChange = (e) => {
    this.setState({...this.state, stock: e.target.value.trim()});
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
  handleGoAnalysis = (stock) => {
    this.setState({...this.state, stock: stock});
    this.props.history.push("/analysis/" + stock);
    if (this.props.that) this.props.that.refresh(stock);
  }
  setFocus = () => {
    document.getElementById("search").focus();
  }
  render() {
    document.title = "FR Shield";
    if (this.props.title) document.title += " " + this.props.title;
    let content;
    if (this.state.stock === "") content = <div className={styles.recommendPlain}>在这里将给出搜索建议</div>;
    else {
      const stocks = AssociateStock(this.state.stock);
      if (stocks === false || stocks.length === 0) content = <div className={styles.recommendPlain}>没有搜索建议</div>;
      else {
        content = (
          <div>
            {stocks.map((item, index) => {
              return (
                <div key={index} className={`${styles.recommended} ${styles.cursorPointer}`} onClick={this.handleGoAnalysis.bind(this, item[0])}>{item[0] + "：" + item[1]}</div>
              );
            })}
          </div>
        );
      }
    }
    return (
      <div className={styles.whole}>
        <div className={styles.header}>
          <div className={styles.title}>
            FR Shield
          </div>
          <div className={styles.navigator}>
            <FlatButton text="首 页" href="/" />
            {window.sessionStorage.token ? <FlatButton text="股票浏览" href="/stocks" /> : ""}
            {window.sessionStorage.token ? <FlatButton text="综合分析" onClick={this.setFocus} /> : ""}
            {window.sessionStorage.token ? <FlatButton text="用户论坛" href="/forum" /> : ""}
            <FlatButton text={window.sessionStorage.token ? "个人中心" : "登录"} href="/user" />
            {window.sessionStorage.token ? <FlatButton text="登出" onClick={this.handleLogout} /> : ""}
          </div>
        </div>
        {window.sessionStorage.token ? 
          <div className={styles.searchBox}>
            <Popover content={content} trigger="focus" placement="bottom">
              <Input id="search" autoComplete={"off"} className={`${styles.defaultShadowBox} ${styles.searchText}`} placeholder="搜索股票名称或代码.." onKeyDown={this.handleSearch} onChange={this.handleChange} value={this.state.stock} />
            </Popover>
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