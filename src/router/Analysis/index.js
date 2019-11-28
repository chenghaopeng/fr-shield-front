import React from "react";
import styles from "./index.module.less";
import Frame from "../../components/Frame";
import { withRouter } from "react-router"
import FlatButton from "../../components/FlatButton/FlatButton";
import { Row, Col, Spin } from "antd";
import { information, emotion } from "../../services/apiHTTP";
import Profit from "./Information/Profit";
import Operation from "./Information/Operation";
import Solvency from "./Information/Solvency";
import Development from "./Information/Development";

class Analysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {stockname: this.props.match.params.stock, stockcode: "", view: 1, status: [-1, -1, -1], datas: [[[], [], [], [], []], {}, {}]};
    this.refresh(this.props.match.params.stock);
  }
  refresh = (stockname) => {
    this.setState({stockname: stockname, stockcode: "", view: 1, status: [-1, -1, -1], datas: [[[], [], [], [], []], {}, {}]});
  }
  toView = view => {
    this.setState({...this.state, view: view});
  }
  getDataAnly = () => {
    if (this.state.status[0] === -1) {
      let ns = this.state;
      ns.status[0] = 0;
      this.setState(ns);
      for (let i = 1; i <= 5; ++i) {
        information({stock: this.state.stockname, number: i.toString()}).then(res => {
          if (res.code === 0) {
            let ns = this.state;
            ns.datas[0][i - 1] = res.data.data;
            ns.status[0]++;
            this.setState(ns);
          }
        });
      }
    }
    return <Spin size="large"/>
  }
  getEmotionAnly = () => {
    if (this.state.status[1] === -1) {
      let ns = this.state;
      ns.status[1] = 0;
      this.setState(ns);
      emotion({stock: this.state.stockname}).then(res => {
        if (res.code === 0) {
          let ns = this.state;
          ns.datas[1] = res.data;
          ns.status[1] = 1;
          this.setState(ns);
        }
      });
    }
    return <Spin />
  }
  renderDataAnly = (id) => {
    if (this.state.status[0] !== 5) return <this.getDataAnly />;
    let component;
    if (id === 1) return component = <Profit csv={this.state.datas[0]} />;
    if (id === 2) return component = <Operation csv={this.state.datas[0]} />;
    if (id === 3) return component = <Solvency csv={this.state.datas[0]} />;
    if (id === 4) return component = <Development csv={this.state.datas[0]} />;
    return component;
  }
  renderEmotionAnly = (id) => {
    if (this.state.status[1] !== 1) return <this.getEmotionAnly />;
    let component;
    if (id === 1) component = <div className={styles.redu}>{this.state.datas[1].redu}</div>;
    if (id === 2) component = <div></div>;
    return component;
  }
  render() {
    const component = (
      <div className={styles.whole}>
        <div className={`${styles.defaultBox} ${styles.defaultRow}`}>
          {this.state.stockname}
        </div>
        <div className={styles.tabs}>
          <FlatButton text="股票资料" onClick={this.toView.bind(this, 1)} />
          <FlatButton text="数据分析" onClick={this.toView.bind(this, 2)} />
          <FlatButton text="舆情分析" onClick={this.toView.bind(this, 3)} />
          <FlatButton text="财务分析" onClick={this.toView.bind(this, 4)} />
        </div>
        { this.state.view === 1 ?
          <Row className={styles.defaultRow}>
            <Col span={24} className={styles.defaultBox}>
              这是股票资料，以后再说
            </Col>
          </Row>
        : ""}
        { this.state.view === 2 ?
          <Row className={styles.defaultRow}>
            <Col span={24} className={styles.defaultBox}>
              <div className={styles.defaultTitle}>盈利能力</div>
              {this.renderDataAnly(1)}
            </Col>
            <Col span={24} className={styles.defaultBox}>
              <div className={styles.defaultTitle}>运营能力</div>
              {this.renderDataAnly(2)}
            </Col>
            <Col span={24} className={styles.defaultBox}>
              <div className={styles.defaultTitle}>偿债能力</div>
              {this.renderDataAnly(3)}
            </Col>
            <Col span={24} className={styles.defaultBox}>
              <div className={styles.defaultTitle}>发展能力</div>
              {this.renderDataAnly(4)}
            </Col>
          </Row>
        : ""}
        { this.state.view === 3 ?
          <Row className={styles.defaultRow}>
            <Col span={5} className={styles.defaultBox}>
              <div className={styles.defaultTitle}>舆论热度</div>
              {this.renderEmotionAnly(1)}
            </Col>
            <Col span={10} offset={1} className={styles.defaultBox}>
              <div className={styles.defaultTitle}>情感分布</div>
              {this.renderEmotionAnly(2)}
            </Col>
          </Row>
        : ""}
        { this.state.view === 4 ?
          <Row className={styles.defaultRow}>
            <Col span={24} className={styles.defaultBox}>
              这是财务分析
            </Col>
          </Row>
        : ""}
      </div>
    );
    return <Frame node={component} title={"综合分析[" + this.state.stockname + "]"} that={this} />
  }
}

export default withRouter(Analysis);