import React from "react";

import { Chart, Axis, Tooltip, Geom, Legend } from "bizcharts";

import TabBar from "./TabBar";

class Profit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {id: 1, pos: 5};
  }
  renderChart = () => {
    const { csv } = this.props;
    let data = [], scale, l, r;
    switch (this.state.id) {
      case 1:
        scale = {
          shijian: { alias: "报告日期" },
          jinglirun: { alias: "净利润（万）" },
          shouyilv: { alias: "收益率（%）" }
        };
        l = Math.floor((this.state.pos - 1) * (csv[2][0].length - 1) / 5 + 1);
        r = Math.floor(this.state.pos * (csv[2][0].length - 1) / 5);
        for (let i = r; i >= l; --i) {
          if (!csv[2][0][i]) continue;
          data.push({shijian: new Date(csv[2][0][i]).format("yyyy年MM月dd日"), jinglirun: parseInt(csv[2][10][i]), shouyilv: parseFloat(csv[2][19][i])});
        }
        return (
          <Chart data={data} scale={scale} forceFit>
            <Legend />
            <Tooltip />
            <Axis name="shijian" title />
            <Axis name="jinglirun" position="left" />
            <Axis name="shouyilv" position="right" />
            <Geom type="interval" position="shijian*jinglirun" color={"#7B6FEC"} />
            <Geom type="line" position="shijian*shouyilv" color={"#5BC2F3"} />
            <Geom type="point" position="shijian*shouyilv" color={"#5BC2F3"} size={4} shape={"circle"} style={{ stroke: "#fff", lineWidth: 1 }} />
          </Chart>
        );
      case 2:
        l = Math.floor((this.state.pos - 1) * (csv[2][0].length - 1) / 5 + 1);
        r = Math.floor(this.state.pos * (csv[2][0].length - 1) / 5);
        let maxLRL = 0;
        for (let i = r; i >= l; --i) {
          if (!csv[2][0][i] || csv[2][0][i] === "--" || csv[2][9][i] === "--" || csv[2][10][i] === "--" || csv[2][14][i] === "--" || csv[2][14][i + 1] === "--") continue;
          let pingjunzongzichan = Math.floor(parseInt(csv[2][14][i]) + parseInt(csv[2][14][i + 1] ? csv[2][14][i + 1] : csv[2][14][i]) / 2);
          let t = new Date(csv[2][0][i]).format("yyyy年MM月dd日");
          let lirunlv = parseFloat((parseInt(csv[2][9][i]) / pingjunzongzichan * 100).toFixed(2)), jinglirunlv = parseFloat((parseInt(csv[2][10][i]) / pingjunzongzichan * 100).toFixed(2));
          data.push({name: "净利润（万）", shijian: t, fenzu: parseInt(csv[2][10][i])});
          data.push({name: "总利润（万）", shijian: t, fenzu: parseInt(csv[2][9][i])});
          data.push({name: "平均总资产（万）", shijian: t, fenzu: pingjunzongzichan});
          data.push({name: "总资产利润率（%）", shijian: t, lirunlv: lirunlv});
          data.push({name: "总资产净利润率（%）", shijian: t, jinglirunlv: jinglirunlv});
          maxLRL = Math.max(maxLRL, lirunlv);
          maxLRL = Math.max(maxLRL, jinglirunlv);
        }
        scale = {
          shijian: { alias: "报告日期" },
          fenzu: { type: "linear" },
          lirunlv: { type: "linear", min: 0, max: maxLRL * 1.2 },
          jinglirunlv: { type: "linear", min: 0, max: maxLRL * 1.2 }
        };
        return (
          <Chart data={data} scale={scale} forceFit>
            <Legend />
            <Tooltip />
            <Axis name="shijian" title />
            <Axis name="fenzu" position="left" />
            <Axis name="lirunlv" position="right" />
            <Axis name="jinglirunlv" visible={false} />
            <Geom type="interval" position="shijian*fenzu" color={"name"} adjust={[{type: "dodge"}]} />
            <Geom type="line" position="shijian*lirunlv" color={"name"} />
            <Geom type="line" position="shijian*jinglirunlv" color={"name"} />
          </Chart>
        );
      case 3:
        l = Math.floor((this.state.pos - 1) * (csv[2][0].length - 1) / 5 + 1);
        r = Math.floor(this.state.pos * (csv[2][0].length - 1) / 5);
        for (let i = r; i >= l; --i) {
          if (!csv[2][0][i] || csv[2][0][i] === "--" || csv[2][10][i] === "--" || parseInt(csv[2][18][i]) === 0 || csv[2][18][i] === "--") continue;
          const t = new Date(csv[2][0][i]).format("yyyy年MM月dd日");
          data.push({name: "净利润（万）", shijian: t, fenzu: parseInt(csv[2][10][i])});
          data.push({name: "平均所有者权益（万）", shijian: t, fenzu: parseInt(csv[2][18][i])});
          data.push({name: "所有者权益报酬率（%）", shijian: t, baochoulv: parseFloat((parseInt(csv[2][10][i]) / parseInt(csv[2][18][i]) * 100).toFixed(2))});
        }
        scale = {
          shijian: { alias: "报告日期" }
        };
        return (
          <Chart data={data} scale={scale} forceFit>
            <Legend />
            <Tooltip />
            <Axis name="shijian" title />
            <Axis name="fenzu" position="left" />
            <Axis name="baochoulv" position="right" />
            <Geom type="interval" position="shijian*fenzu" color={"name"} adjust={[{type: "dodge"}]} />
            <Geom type="line" position="shijian*baochoulv" color={"name"} />
          </Chart>
        );
      case 4:
        l = Math.floor((this.state.pos - 1) * (csv[2][0].length - 1) / 5 + 1);
        r = Math.floor(this.state.pos * (csv[2][0].length - 1) / 5);
        for (let i = r; i >= l; --i) {
          if (!csv[2][0][i] || csv[2][0][i] === "--" || csv[2][1][i] === "--") continue;
          const t = new Date(csv[2][0][i]).format("yyyy年MM月dd日");
          data.push({name: "基本每股收益（元）", shijian: t, shouyi: parseFloat(csv[2][1][i])});
        }
        scale = {
          shijian: { alias: "报告日期" }
        };
        return (
          <Chart data={data} scale={scale} forceFit>
            <Legend />
            <Tooltip />
            <Axis name="shijian" title />
            <Axis name="shouyi" />
            <Geom type="interval" position="shijian*shouyi" color={"name"} />
          </Chart>
        );
      case 5:
        l = Math.floor((this.state.pos - 1) * (csv[1][0].length - 1) / 5 + 1);
        r = Math.floor(this.state.pos * (csv[1][0].length - 1) / 5);
        for (let i = r; i >= l; --i) {
          if (!csv[1][0][i] || csv[1][0][i] === "--" || csv[1][9][i] === "--" || csv[1][2][i] === "--") continue;
          const t = new Date(csv[1][0][i]).format("yyyy年MM月dd日");
          const yysr = parseInt(csv[1][2][i]), yycb = parseInt(csv[1][9][i]);
          data.push({name: "营业收入（万）", shijian: t, fenzu: yysr});
          data.push({name: "营业成本（万）", shijian: t, fenzu: yycb});
          data.push({name: "毛利率（%）", shijian: t, maolilv: parseFloat(((yysr - yycb) / yycb).toFixed(2))});
        }
        scale = {
          shijian: { alias: "报告日期" }
        };
        return (
          <Chart data={data} scale={scale} forceFit>
            <Legend />
            <Tooltip />
            <Axis name="shijian" title />
            <Axis name="fenzu" position="left" />
            <Axis name="maolilv" position="right" />
            <Geom type="interval" position="shijian*fenzu" color={"name"} adjust={[{type: "dodge"}]} />
            <Geom type="line" position="shijian*maolilv" color={"name"} />
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
          titles={["企业净资产收益率走势", "企业总资产利润率", "所有者权益报酬率", "基本每股收益", "主营业务毛利率"]}
          that={this}
        />
        <this.renderChart />
      </div>
    );
  }
}

export default Profit;