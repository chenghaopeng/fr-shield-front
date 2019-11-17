import React from "react";

import { Slider } from "antd";
import { Chart, Axis, Tooltip, Geom, Legend } from "bizcharts";

import TabBar from "./TabBar";

class Profit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {id: 1, pos: 5};
  }
  renderChart = () => {
    const { csv } = this.props;
    switch (this.state.id) {
      case 1:
        let data = [], cols = {
          shijian: { alias: "报告日期" },
          jinglirun: { alias: "净利润（万）" },
          shouyilv: { alias: "收益率（%）" }
        };
        let l = Math.floor((this.state.pos - 1) * (csv[2][0].length - 1) / 5 + 1), r = Math.floor(this.state.pos * (csv[2][0].length - 1) / 5);
        for (let i = r; i >= l; --i) {
          data.push({shijian: new Date(csv[2][0][i]).format("yyyy年MM月dd日"), jinglirun: parseInt(csv[2][10][i]), shouyilv: parseFloat(csv[2][19][i])});
        }
        return (
          <Chart data={data} scale={cols} forceFit>
            <Legend />
            <Tooltip />
            <Axis name="shijian" title />
            <Axis name="jinglirun" />
            <Axis name="shouyilv" />
            <Geom type="interval" position="shijian*jinglirun" color={"#7B6FEC"} />
            <Geom type="line" position="shijian*shouyilv" color={"#5BC2F3"} />
            <Geom type="point" position="shijian*shouyilv" size={4} shape={"circle"} style={{ stroke: "#fff", lineWidth: 1 }} color={"#5BC2F3"} />
          </Chart>
        );
    }
    return (
      <div>
        {this.state.id}
      </div>
    );
  }
  handleSliderChange = (value) => {
    this.setState({...this.state, pos: 6 - value});
  }
  render() {
    return (
      <div>
        <TabBar
          titles={["企业净资产收益率走势", "企业总资产利润率", "所有者权益报酬率", "基本每股收益", "主营业务毛利率"]}
          that={this}
        />
        <Slider onChange={this.handleSliderChange} min={1} max={5} step={1} />
        <this.renderChart />
      </div>
    );
  }
}

export default Profit;