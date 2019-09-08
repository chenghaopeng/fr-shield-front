import React, { Component } from "react";
import styles from "./index.module.less";
import { withRouter } from "react-router-dom";

import WithHeader from "../../component/WithHeader";

class Personal extends Component {
  constructor(props) {
    super(props);
    this.state = {fp: 0};
  }
  changeFootprint = () => {
    this.setState({...this.state, fp: 1 - this.state.fp});
  }
  getFootprint = () => {
    return (
      <div className={styles.container}>
        你的足迹
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
      </div>
    );
  }
}

export default WithHeader(withRouter(Personal), "个人中心");