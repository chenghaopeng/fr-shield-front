import React, { Component } from "react";
import styles from "./index.module.less";
import { withRouter } from "react-router-dom";
import { Skeleton, Progress, Empty, Tabs } from "antd";

import WithHeader from "../../component/WithHeader";
import { information } from "../../services/apiHTTP";

import Profit from "./components/Profit";
import Operation from "./components/Operation";
import Solvency from "./components/Solvency";
import Development from "./components/Development";

class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {got: 0, cnt: 0, data: [[], [], [], [], []], progress: 0, stockname: "", stockcode: ""};
  }

  componentWillMount() {
    let stock = this.props.match.params.stock.trim();
    if (stock === "") {
      this.props.history.push("/");
      return;
    }
    for (let i = 1; i <= 5; ++i) {
      information({stock: stock, number: i.toString()}).then(res => {
        if (res.code === 0) {
          let d = this.state.data;
          d[i - 1] = res.data.data;
          this.setState({cnt: this.state.cnt + 1, data: d, stockname: res.data.stockname, stockcode: res.data.stockcode});
        }
        else {
          this.setState({got: -1});
        }
      });
    }
  }

  componentDidMount() {
    let timer = setInterval(() => {
      if (this.state.got === -1) clearInterval(timer);
      if (this.state.cnt !== 5) {
        if (this.state.progress < 98) {
          this.setState({...this.state, progress: this.state.progress + Math.random() * (100 - this.state.progress) / 50});
        }
      }
      else {
        clearInterval(timer);
        this.setState({...this.state, progress: 100});
        setTimeout(() => { this.setState({...this.state, got: 1}); }, 200);
        console.log(this.state);
      }
    }, 100);
  }

  loading = () => {
    if (this.state.got === 0) {
      return (
        <div className={styles.skeleton}>
          <Progress percent={Math.floor(this.state.progress)} status="active" strokeWidth={20} strokeColor={"#9f8e79"} />
          <Skeleton active />
        </div>
      );
    }
    else {
      return (
        <div className={this.empty} style={{fontSize: "2.5vh"}}>
          <Empty description="" />
          {"股票代码或名称“" + this.props.match.params.stock.trim() + "”错误！"}
        </div>
      );
    }
  }

  handleTabChange = (activeKey) => {
    let stock = this.props.match.params.stock.trim();
    this.props.history.push("/information/" + stock + "/" + activeKey);
  }

  information = () => {
    const tabPaneStyle = (str) => {
      return (
        <div style={{fontSize: "3.5vh"}}>
          {str}
        </div>
      );
    }
    let { nav } = this.props.match.params;
    if (!nav) nav = 1;
    if (nav > 4) nav = 4;
    if (nav < 1) nav = 1;
    nav = nav.toString();
    return (
      <Tabs defaultActiveKey={nav} tabPosition={"left"} className={styles.tabs} onChange={this.handleTabChange}>
        <Tabs.TabPane tab={tabPaneStyle("盈利能力")} key={"1"}>
          <Profit csv={this.state.data} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={tabPaneStyle("运营能力")} key={"2"}>
          <Operation csv={this.state.data} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={tabPaneStyle("偿债能力")} key={"3"}>
          <Solvency csv={this.state.data} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={tabPaneStyle("发展能力")} key={"4"}>
          <Development csv={this.state.data} />
        </Tabs.TabPane>
      </Tabs>
    );
  }
  
  render() {
    return (
      <div className={styles.whole}>
        <div className={styles.title}>{this.state.got === 1 ? this.state.stockname + " " + this.state.stockcode : ""}</div>
        {this.state.got === 1 ? <this.information /> : <this.loading />}
      </div>
    );
  }
}

export default WithHeader(withRouter(Information), "数据分析");