import React from "react";
import styles from "./index.module.less";
import Frame from "../../components/Frame";
import { withRouter } from "react-router"
import FlatButton from "../../components/FlatButton/FlatButton";
import { Row, Col, Spin, List, Descriptions, Empty } from "antd";
import { information, emotion } from "../../services/apiHTTP";
import Profit from "./Information/Profit";
import Operation from "./Information/Operation";
import Solvency from "./Information/Solvency";
import Development from "./Information/Development";
import { Chart, Coord, Tooltip, Legend, Geom } from "bizcharts";
import { FindStock } from "../../utils/stocks";
import { isNumber } from "util";

class Analysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {stock: FindStock(this.props.match.params.stock), stockname: this.props.match.params.stock, view: 1, status: [-1, -1, -1], datas: [[[], [], [], [], []], {}, {}]};
    this.refresh(this.props.match.params.stock);
  }
  refresh = (stockname) => {
    this.setState({stock: FindStock(stockname), stockname: stockname, view: 1, status: [-1, -1, -1], datas: [[[], [], [], [], []], {}, {}]});
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
  renderInformation = () => {
    return (
      <Descriptions column={2} bordered>
        <Descriptions.Item label="股票代码">{this.state.stock[0]}</Descriptions.Item>
        <Descriptions.Item label="中文简称">{this.state.stock[1]}</Descriptions.Item>
        <Descriptions.Item label="公司全称" span={2}>{this.state.stock[2]}</Descriptions.Item>
        <Descriptions.Item label="英文名称">{this.state.stock[3]}</Descriptions.Item>
        <Descriptions.Item label="注册资本">{this.state.stock[4]}</Descriptions.Item>
        <Descriptions.Item label="员工人数">{this.state.stock[5]}</Descriptions.Item>
        <Descriptions.Item label="地域">{this.state.stock[6]}</Descriptions.Item>
        <Descriptions.Item label="办公地址">{this.state.stock[7]}</Descriptions.Item>
        <Descriptions.Item label="董事长">{this.state.stock[8]}</Descriptions.Item>
        <Descriptions.Item label="董事会秘书">{this.state.stock[9]}</Descriptions.Item>
        <Descriptions.Item label="法人代表">{this.state.stock[10]}</Descriptions.Item>
        <Descriptions.Item label="总经理">{this.state.stock[11]}</Descriptions.Item>
        <Descriptions.Item label="CSRC行业门类">{this.state.stock[14]}</Descriptions.Item>
        <Descriptions.Item label="CSRC行业大类">{this.state.stock[15]}</Descriptions.Item>
        <Descriptions.Item label="CSRC行业中类">{this.state.stock[16]}</Descriptions.Item>
        <Descriptions.Item label="SSE行业">{this.state.stock[17]}</Descriptions.Item>
        <Descriptions.Item label="境外上市地">{this.state.stock[18]}</Descriptions.Item>
        <Descriptions.Item label="主营业务" span={2}>{this.state.stock[12]}</Descriptions.Item>
        <Descriptions.Item label="经营范围" span={2}>{this.state.stock[13]}</Descriptions.Item>
      </Descriptions>
    );
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
    if (id === 2) {
      let emotion_data = [
        {
          emotion: "十分悲观",
          number: 0
        },
        {
          emotion: "悲观",
          number: 0
        },
        {
          emotion: "中性偏悲观",
          number: 0
        },
        {
          emotion: "中性",
          number: 0
        },
        {
          emotion: "中性偏乐观",
          number: 0
        },
        {
          emotion: "乐观",
          number: 0
        },
        {
          emotion: "十分乐观",
          number: 0
        }
      ];
      this.state.datas[1].qg.map(item => emotion_data[item].number++);
      component = (
        <Chart height={250} data={emotion_data} padding="auto" forceFit>
          <Coord type="polar" />
          <Tooltip />
          <Legend position="bottom" />
          <Geom type="interval" color="emotion" position="emotion*number" />
        </Chart>
      );
    }
    const ListSize = "default";
    if (id === 3) {
      let fxyj_data = [];
      this.state.datas[1].fxyj.map(item => item.map(item => fxyj_data.push(item)));
      component = <List size={ListSize} bordered dataSource={fxyj_data} renderItem={item => <List.Item>{item}</List.Item>} />;
    }
    if (id === 4) component = <List size={ListSize} bordered dataSource={this.state.datas[1].cwpj} renderItem={item => <List.Item>{item}</List.Item>} />;
    if (id === 5) component = <List size={ListSize} bordered dataSource={this.state.datas[1].sjpj} renderItem={item => <List.Item>{item}</List.Item>} />;
    if (id === 6) component = <List size={ListSize} bordered dataSource={this.state.datas[1].jkpj} renderItem={item => <List.Item>{item}</List.Item>} />;
    if (id === 7) {
      const rddata = this.state.datas[1];
      let ylrd_data = [];
      // eslint-disable-next-line
      for (let time in rddata.allcount) {
        let cur = {};
        cur["日期"] = time.substr(0, time.length - 2) + "月" + time.substr(time.length - 2, 2) + "日";
        cur["所有帖子"] = rddata.allcount[time];
        cur["财务评价"] = isNumber(rddata.count1[time]) ? rddata.count1[time] : 0;
        cur["财务新闻"] = isNumber(rddata.count2[time]) ? rddata.count2[time] : 0;
        cur["事件评价"] = isNumber(rddata.count3[time]) ? rddata.count3[time] : 0;
        cur["事件新闻"] = isNumber(rddata.count4[time]) ? rddata.count4[time] : 0;
        ylrd_data.push(cur);
      }
      return (
        <Chart height={362} data={ylrd_data} padding="auto" forceFit>
          <Tooltip />
          <Legend />
          <Geom type="line" color="#5DB1FF" position="日期*所有帖子" />
          <Geom type="line" color="#2FC25B" position="日期*财务评价" />
          <Geom type="line" color="#FBDB5A" position="日期*财务新闻" />
          <Geom type="line" color="#8543E0" position="日期*事件评价" />
          <Geom type="line" color="#223273" position="日期*事件新闻" />
        </Chart>
      );
    }
    return component;
  }
  render() {
    let component;
    if (!this.state.stock) component = (
      <div className={styles.whole}>
        <div className={`${styles.defaultBox} ${styles.empty}`}>
          <Empty description={"股票名称或代码“" + this.state.stockname + "”错误！"} />
        </div>
      </div>
    );
    else component = (
      <div className={styles.whole}>
        <div className={styles.tabs}>
          <FlatButton text={this.state.stock[0] + "：" + this.state.stock[1]} style={{flex: "1", marginLeft: "0"}} />
          <FlatButton text="基本资料" onClick={this.toView.bind(this, 1)} />
          <FlatButton text="数据分析" onClick={this.toView.bind(this, 2)} />
          <FlatButton text="舆情分析" onClick={this.toView.bind(this, 3)} />
          <FlatButton text="财务分析" onClick={this.toView.bind(this, 4)} />
        </div>
        { this.state.view === 1 ?
          <Row className={styles.defaultRow}>
            <Col span={24} className={styles.defaultBox}>
              <div className={styles.defaultTitle}>股票资料</div>
              {this.renderInformation()}
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
            <Col span={8}>
              <div className={styles.defaultBox}>
                <div className={styles.defaultTitle}>舆论热度</div>
                {this.renderEmotionAnly(1)}
              </div>
              <div className={styles.defaultBox}>
                <div className={styles.defaultTitle}>情感分布</div>
                {this.renderEmotionAnly(2)}
              </div>
            </Col>
            <Col span={15} offset={1} className={styles.defaultBox}>
              <div className={styles.defaultTitle}>舆论热度时间分布</div>
              {this.renderEmotionAnly(7)}
            </Col>
            <Col span={24} className={styles.defaultBox}>
              <div className={styles.defaultTitle}>分析意见</div>
              {this.renderEmotionAnly(3)}
            </Col>
            <Col span={24} className={styles.defaultBox}>
              <div className={styles.defaultTitle}>财务评价</div>
              {this.renderEmotionAnly(4)}
            </Col>
            <Col span={24} className={styles.defaultBox}>
              <div className={styles.defaultTitle}>事件评价</div>
              {this.renderEmotionAnly(5)}
            </Col>
            <Col span={24} className={styles.defaultBox}>
              <div className={styles.defaultTitle}>近况评价</div>
              {this.renderEmotionAnly(6)}
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