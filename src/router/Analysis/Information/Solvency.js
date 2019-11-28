import React from "react";

import { Chart, Axis, Tooltip, Geom, Legend } from "bizcharts";

import TabBar from "./TabBar";
import { DateFormat } from "../../../utils/date";

class Solvency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {id: 1, pos: 5};
  }
  renderChart = () => {
    const { csv } = this.props;
    let data = [], scale, l, r;
    switch (this.state.id) {
      case 1:
        l = Math.floor((this.state.pos - 1) * (csv[1][0].length - 1) / 5 + 1);
        r = Math.floor(this.state.pos * (csv[1][0].length - 1) / 5);
        for (let i = r; i >= l; --i) {
          if (!csv[0][0][i] || csv[0][0][i] === "--" || csv[0][94][i] === "--" || csv[0][52][i] === "--") continue;
          let t = DateFormat(csv[0][0][i]);
          data.push({name: "负债总额（万）", shijian: t, fenzu: parseInt(csv[0][94][i])});
          data.push({name: "资产总额（万）", shijian: t, fenzu: parseInt(csv[0][52][i])});
          data.push({name: "资产负债率（%）", shijian: t, bilv: parseFloat((parseInt(csv[0][94][i]) / parseInt(csv[0][52][i]) * 100).toFixed(2))});
        }
        scale = {
          shijian: { alias: "报告日期" },
        };
        return (
          <Chart height={500} data={data} scale={scale} padding="auto" forceFit>
            <Legend />
            <Tooltip />
            <Axis name="shijian" title />
            <Axis name="fenzu" position="left" />
            <Axis name="bilv" position="right" />
            <Geom type="interval" position="shijian*fenzu" color={"name"} adjust={[{type: "dodge"}]} />
            <Geom type="line" position="shijian*bilv" color={"name"} />
          </Chart>
        );
      case 2:
        l = Math.floor((this.state.pos - 1) * (csv[1][0].length - 1) / 5 + 1);
        r = Math.floor(this.state.pos * (csv[1][0].length - 1) / 5);
        for (let i = r; i >= l; --i) {
          if (!csv[0][0][i] || csv[0][0][i] === "--" || csv[0][94][i] === "--" || csv[0][107][i] === "--") continue;
          let t = DateFormat(csv[0][0][i]);
          data.push({name: "负债总额（万）", shijian: t, fenzu: parseInt(csv[0][94][i])});
          data.push({name: "所有者权益总额（万）", shijian: t, fenzu: parseInt(csv[0][107][i])});
          data.push({name: "产权比率（%）", shijian: t, bilv: parseFloat((parseInt(csv[0][94][i]) / parseInt(csv[0][107][i])).toFixed(2))});
        }
        scale = {
          shijian: { alias: "报告日期" },
          fenzu: { type: "pow" }
        };
        return (
          <Chart height={500} data={data} scale={scale} padding="auto" forceFit>
            <Legend />
            <Tooltip />
            <Axis name="shijian" title />
            <Axis name="fenzu" position="left" />
            <Axis name="bilv" position="right" />
            <Geom type="interval" position="shijian*fenzu" color={"name"} adjust={[{type: "dodge"}]} />
            <Geom type="line" position="shijian*bilv" color={"name"} />
          </Chart>
        );
      case 3:
        l = Math.floor((this.state.pos - 1) * (csv[1][0].length - 1) / 5 + 1);
        r = Math.floor(this.state.pos * (csv[1][0].length - 1) / 5);
        for (let i = r; i >= l; --i) {
          if (!csv[0][0][i] || csv[0][0][i] === "--" || csv[0][94][i] === "--" || csv[3][81][i] === "--") continue;
          let t = DateFormat(csv[0][0][i]);
          data.push({name: "负债总额（万）", shijian: t, fenzu: parseInt(csv[0][94][i])});
          data.push({name: "经营活动净现金流量（万）", shijian: t, fenzu: parseInt(csv[3][81][i])});
          data.push({name: "经营活动净现金比率（%）", shijian: t, bilv: parseFloat((parseInt(csv[3][81][i]) / parseInt(csv[0][94][i]) * 100).toFixed(2))});
        }
        scale = {
          shijian: { alias: "报告日期" },
          fenzu: { type: "linear" }
        };
        return (
          <Chart height={500} data={data} scale={scale} padding="auto" forceFit>
            <Legend />
            <Tooltip />
            <Axis name="shijian" title />
            <Axis name="fenzu" position="left" />
            <Axis name="bilv" position="right" />
            <Geom type="interval" position="shijian*fenzu" color={"name"} adjust={[{type: "dodge"}]} />
            <Geom type="line" position="shijian*bilv" color={"name"} />
          </Chart>
        );
      default:
        break;
    }
    return (
      <div>
        {this.state.id}
      </div>
    );
  }
  render() {
    return (
      <div>
        <TabBar
          titles={["企业资产负债率走势", "企业产权比率走势", "企业经营活动净现金比率走势"]}
          that={this}
        />
        <this.renderChart />
      </div>
    );
  }
}

export default Solvency;