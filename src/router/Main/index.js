import React, { Component } from "react";
import styles from "./index.module.less";
import { Link } from "react-router-dom";
import WithHeader from "../../component/WithHeader"

class Main extends Component {
  render() {
    return (
      <div className={styles.whole}>
        <button className={styles.cmdButton}>风险扫描</button>
        <button className={styles.cmdButton}>财报分析</button>
        <button className={styles.cmdButton}>投资组合评分</button>
        <button className={styles.cmdButton}>个人空间</button>
        <button className={styles.cmdButton}>用户论坛</button>
        <button className={styles.cmdButton}>咨询服务</button>
      </div>
    );
  }
}

export default WithHeader(Main, "FR Shield");