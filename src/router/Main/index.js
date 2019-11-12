import React, { Component } from "react";
import styles from "./index.module.less";

import MdSearch from "react-ionicons/lib/MdSearch";
import { withRouter } from "react-router-dom"

import { message, Popover } from "antd";

import WithHeader from "../../component/WithHeader";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {searchMode: 0};
  }

  getStateName = () => {
    if (this.state.searchMode === 0) return "财务分析";
    if (this.state.searchMode === 1) return "数据分析";
  }

  toInput = (id) => {
    this.setState({...this.state, searchMode: id});
    document.getElementById("stock").focus();
  }

  toSearch = () => {
    var stock = document.getElementById("stock").value.trim();
    if (stock === "") {
      message.error("请输入股票代码或名称！");
    }
    else {
      if (this.state.searchMode === 0) this.props.history.push("/analysis/" + stock);
      else if (this.state.searchMode === 1) this.props.history.push("/information/" + stock);
    }
  }

  toForum = () => {
    message.loading("正在加载用户论坛...", Math.random() * .8, () => {this.props.history.push("/forum");});
  }
  
  toPersonal = () => {
    this.props.history.push("/personal");
  }

  render() {
  const content = (<p style={{fontSize: "3vh"}}>{this.getStateName()}：请输入股票代码或名称</p>);
    return (
      <div className={styles.whole}>
        <div className={styles.searchBox}>
          <Popover content={content} trigger="focus">
            <input id="stock" name="stock" type="text" className={styles.stock} autoComplete="off" placeholder={this.getStateName()}/>
          </Popover>
          <button className={styles.search} onClick={this.toSearch}><MdSearch fontSize="6vh" color="rgb(89, 77, 73)"/></button>
        </div>
        {/* <div className={styles.iconBox}>
        </div> */}
        <div className={styles.toolBox}>
          <button className={styles.cmdButton} onClick={this.toInput.bind(this, 0)}>财务分析</button>
          <button className={styles.cmdButton} onClick={this.toInput.bind(this, 1)}>数据分析</button>
          <button className={styles.cmdButton} onClick={this.toForum}>用户论坛</button>
          <button className={styles.cmdButton} onClick={this.toPersonal}>个人中心</button>
        </div>
      </div>
    );
  }
}

export default WithHeader(withRouter(Main));