import React, { Component } from "react";
import styles from "./index.module.less";

import { withRouter } from "react-router-dom";
import { Progress } from "antd";

import WithHeader from "../../component/WithHeader";
import ImportantIndex from "../../component/ImportantIndex";
import RiskContrast from "../../component/RiskContrast";
import TrustedItem from "../../component/TrustedItem";

class Analysis extends Component {
  constructor(props) {
    super(props);
    this.state = {nav: 1};
  }

  componentWillMount() {
    if (!window.sessionStorage.analysisData) {
      this.props.history.push("/");
    }
  }

  componentWillUnmount() {
    window.sessionStorage.removeItem("analysisData");
  }

  changeInfo = n => {
    this.setState({nav: n});
  }

  getInfo = () => {
    const { nav } = this.state;
    if (nav === 1) return <ImportantIndex/>;
    if (nav === 2) return <RiskContrast/>;
    return <TrustedItem/>;
  }
  
  render() {
    const { nav } = this.state;
    return (
      <div className={styles.whole}>
        <div className={styles.gradeContainer}>
          {/* <Circle progress="90"
            responsive={true}
            showPercentageSymbol={false}
            progressColor="rgb(159, 142, 121)"
            textColor="rgb(159, 142, 121)"
            roundedStroke={true}
            textStyle={{'font-size': '9vh'}}
          /> */}
          <Progress
            className={styles.circle}
            type="circle"
            strokeColor="rgb(159, 142, 121)"
            percent={68}
            format={percent => {return percent;}}
            strokeWidth={10}
            width={"20vh"}
          />
          <div className={styles.stockTitle}>{this.props.match.params.stock}</div>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.navBar}>
            <div className={`${styles.nav} ${nav === 1? styles.activeNav: ''}`} onClick={this.changeInfo.bind(this, 1)}>
              重要指标
            </div>
            <div className={`${styles.nav} ${nav === 2? styles.activeNav: ''}`} onClick={this.changeInfo.bind(this, 2)}>
              行业风险对比
            </div>
            <div className={`${styles.nav} ${nav === 3? styles.activeNav: ''}`} onClick={this.changeInfo.bind(this, 3)}>
              已信任项
            </div>
          </div>
          <div className={styles.info}>
            <this.getInfo/>
          </div>
        </div>
      </div>
    );
  }
}

export default WithHeader(withRouter(Analysis), "财务分析");