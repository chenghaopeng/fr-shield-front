import React, { Component } from "react";
import styles from "./index.module.less";

import { withRouter } from "react-router-dom";
import { message, Progress, Spin, Empty } from "antd";

import WithHeader from "../../component/WithHeader";
import ImportantIndex from "../../component/ImportantIndex";
import RiskContrast from "../../component/RiskContrast";
import TrustedItem from "../../component/TrustedItem";

import { analysis } from "../../services/apiHTTP";

class Analysis extends Component {
  constructor(props) {
    super(props);
    this.state = {nav: 1, stock: "", trusted: [], data: {got: 0, my: {}, other: {}}};
  }

  componentWillMount() {
    this.state.stock = this.props.match.params.stock.trim();
    if (this.state.stock === "") {
      this.props.history.push("/");
      return;
    }
    if (this.props.match.params.nav) {
      const n = parseInt(this.props.match.params.nav);
      if (n < 1) n = 1;
      if (n > 3) n = 3;
      this.setState({...this.state, nav: n});
    }
    const hide = message.loading("正在查询，请稍候...", 0);
    analysis(this.state.stock).then(res => {
      hide();
      if (res.code === 0) {
        var problem = [];
        res.data.problem.map((item) => {
          if (item !== 0) problem = [...problem, item];
        });
        res.data.problem = problem;
        this.setState({...this.state, data: {...this.state.data, got: 1, my: res.data}});
      }
      else {
        this.setState({...this.state, data: {...this.state.data, got: -1}});
      }
    });
  }

  changeInfo = n => {
    this.props.history.push("/analysis/" + this.state.stock + "/" + n);
    this.setState({...this.state, nav: n});
  }

  getInfo = () => {
    const { nav } = this.state;
    if (nav === 1) return <ImportantIndex data={this.state.data}/>;
    if (nav === 2) return <RiskContrast that={this}/>;
    return <TrustedItem that={this}/>;
  }

  Grade = () => {
    return (
      <Progress
        type="circle"
        strokeColor="rgb(159, 142, 121)"
        percent={parseFloat(this.state.data.my.grade).toFixed(1)}
        format={percent => {return percent;}}
        strokeWidth={10}
        width={"20vh"}
      />
    );
  }
  
  render() {
    const { nav, data } = this.state;
    return (
      <div className={styles.whole}>
        <div className={styles.gradeContainer}>
          <div className={styles.circle}>
            {data.got === 1 ? <this.Grade/> : data.got === 0 ? <Spin size="large"/> : <Empty/>}
          </div>
          <div className={styles.stockTitle}>{data.got === 1 ? data.my.stockname + " " + data.my.stockcode : this.state.stock}</div>
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