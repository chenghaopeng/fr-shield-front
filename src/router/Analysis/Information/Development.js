import React from "react";

import { Chart, Axis, Tooltip, Geom, Legend } from "bizcharts";

import TabBar from "./TabBar";
import { DateFormat } from "../../../utils/date";

class Development extends React.Component {
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
          if (!csv[1][0][i] || csv[1][0][i] === "--" || csv[1][1][i] === "--" || csv[1][1][i + 1] === "--" || csv[4][1][i] === "--") continue;
          let t = DateFormat(csv[1][0][i]);
          const dq = parseInt(csv[1][1][i]), sq = parseInt(csv[1][1][i + 1]), bilv = parseInt(csv[4][1][i]);
          data.push({name: "当期营收（万）", shijian: t, fenzu: dq});
          data.push({name: "上一期营收（万）", shijian: t, fenzu: sq});
          data.push({name: "营业收入增长率（%）", shijian: t, bilv: bilv});
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
        l = Math.floor((this.state.pos - 1) * (csv[0][0].length - 1) / 5 + 1);
        r = Math.floor(this.state.pos * (csv[0][0].length - 1) / 5);
        for (let i = r; i >= l; --i) {
          if (!csv[0][0][i] || csv[0][0][i] === "--" || csv[0][107][i] === "--" || csv[0][107][i + 1] === "--" || csv[4][3][i] === "--") continue;
          let t = DateFormat(csv[0][0][i]);
          const dq = parseInt(csv[0][107][i]), sq = parseInt(csv[0][107][i + 1]), bilv = parseInt(csv[4][3][i]);
          data.push({name: "当期所有者权益总额（万）", shijian: t, fenzu: dq});
          data.push({name: "上一期所有者权益总额（万）", shijian: t, fenzu: sq});
          data.push({name: "资本积累率（%）", shijian: t, bilv: bilv});
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
      case 3:
        l = Math.floor((this.state.pos - 1) * (csv[0][0].length - 1) / 5 + 1);
        r = Math.floor(this.state.pos * (csv[0][0].length - 1) / 5);
        for (let i = r; i >= l; --i) {
          if (!csv[0][0][i] || csv[0][0][i] === "--" || csv[0][52][i] === "--" || csv[0][52][i + 1] === "--" || csv[4][4][i] === "--") continue;
          let t = DateFormat(csv[0][0][i]);
          const dq = parseInt(csv[0][52][i]), sq = parseInt(csv[0][52][i + 1]), bilv = parseInt(csv[4][4][i]);
          data.push({name: "当期总资产（万）", shijian: t, fenzu: dq});
          data.push({name: "上一期总资产（万）", shijian: t, fenzu: sq});
          data.push({name: "总资产增长率（%）", shijian: t, bilv: bilv});
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
          titles={["企业营业收入增长率", "企业净资本增长率", "企业净资产增长率"]}
          that={this}
        />
        <this.renderChart />
      </div>
    );
  }
}

export default Development;