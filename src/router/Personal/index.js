import React, { Component } from "react";
import styles from "./index.module.less";
import { withRouter } from "react-router-dom";

import WithHeader from "../../component/WithHeader";

class Personal extends Component {
  constructor(props) {
    super(props);
    this.state = {fp: 0, pt: 0};
  }
  changeFootprint = () => {
    this.setState({...this.state, fp: 1 - this.state.fp});
  }
  changePosting = () => {
    this.setState({...this.state, pt: 1 - this.state.pt});
  }
  getFootprint = () => {
    return (
      <div className={styles.container}>
        你的足迹
      </div>
    );
  }
  getPosting = () => {
    return (
      <div className={styles.container}>
        你的帖子
      </div>
    );
  }
  render() {
    return (
      <div className={styles.whole}>
        <div className={`${styles.fold} ${this.state.fp === 1 ? styles.show : ''}`} style={{marginTop: 0}} onClick={this.changeFootprint}>
          足迹
        </div>
        {this.state.fp === 1 ? this.getFootprint() : ""}
        <div className={`${styles.fold} ${this.state.pt === 1 ? styles.show : ''}`} onClick={this.changePosting}>
          我的发帖
        </div>
        {this.state.pt === 1 ? this.getPosting() : ""}
      </div>
    );
  }
}

export default WithHeader(withRouter(Personal), "个人中心");