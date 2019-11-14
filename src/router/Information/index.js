import React, { Component } from "react";
import styles from "./index.module.less";
import { withRouter } from "react-router-dom";
import { Skeleton, Progress, Empty } from "antd";

import WithHeader from "../../component/WithHeader";
import { information } from "../../services/apiHTTP";

class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {got: 0, cnt: 0, data: [{}, {}, {}, {}], progress: 0};
  }

  componentWillMount() {
    let stock = this.props.match.params.stock.trim();
    if (stock === "") {
      this.props.history.push("/");
      return;
    }
    for (let i = 1; i <= 4; ++i) {
      information({stock: stock, number: i.toString()}).then(res => {
        if (res.code === 0) {
          let d = this.state.data;
          d[i - 1] = res.data;
          this.setState({cnt: this.state.cnt + 1, data: d});
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
      if (this.state.cnt !== 4) {
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
  
  render() {
    return (
      <div className={styles.whole}>
        {this.state.got === 1 ? JSON.stringify(this.state) : <this.loading />}
      </div>
    );
  }
}

export default WithHeader(withRouter(Information), "数据分析");