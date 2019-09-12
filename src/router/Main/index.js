import React, { Component } from "react";
import styles from "./index.module.less";

import MdSearch from "react-ionicons/lib/MdSearch";
import { withRouter } from "react-router-dom"

import { message, Popover } from "antd";

import WithHeader from "../../component/WithHeader";
import { analysis } from "../../services/apiHTTP";

class Main extends Component {
  componentWillMount() {
    if (!window.sessionStorage.username) {
      this.props.history.push("/login");
    }
  }

  toInput = () => {
    document.getElementById("stock").focus();
  }

  toAnalysis = () => {
    var stock = document.getElementById("stock").value.trim();
    if (stock === "") {
      message.error("请输入股票代码或名称！");
    }
    else {
      const hide = message.loading("正在查询，请稍候...", 0);
      analysis(stock).then(res => {
        hide();
        if (res.code === 0) {
          window.sessionStorage.analysisData = res.data;
          this.props.history.push("/analysis/" + stock);
        }
        else {
          message.error("股票代码或名称错误！");
        }
      });
    }
  }
  
  toInformation = () => {
    this.props.history.push("/information");
  }
  
  toPersonal = () => {
    this.props.history.push("/personal");
  }

  render() {
    const content = (<p style={{fontSize: "3vh"}}>请输入股票代码或名称</p>);
    return (
      <div className={styles.whole}>
        <div className={styles.searchBox}>
          <Popover content={content} trigger="focus">
            <input id="stock" name="stock" type="text" className={styles.stock} autoComplete="off"/>
          </Popover>
          <button className={styles.search} onClick={this.toAnalysis}><MdSearch fontSize="6vh" color="rgb(89, 77, 73)"/></button>
        </div>
        {/* <div className={styles.iconBox}>
        </div> */}
        <div className={styles.toolBox}>
          <button className={styles.cmdButton} onClick={this.toInformation}>信息展示</button>
          <button className={styles.cmdButton} onClick={this.toInput}>财务分析</button>
          <button className={styles.cmdButton} onClick={this.toPersonal}>个人中心</button>
        </div>
      </div>
    );
  }
}

export default WithHeader(withRouter(Main));