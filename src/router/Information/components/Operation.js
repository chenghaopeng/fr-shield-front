import React from "react";

import { Chart, Axis, Tooltip, Geom, Legend } from "bizcharts";

import TabBar from "./TabBar";

class Operation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {id: 1, pos: 5};
  }
  renderChart = () => {
    const { csv } = this.props;
    let data = [], scale, l, r;
    let minR = 0, maxR = 0, last_zzl = 0;
    switch (this.state.id) {
      case 1:
        l = Math.floor((this.state.pos - 1) * (csv[1][0].length - 1) / 5 + 1);
        r = Math.floor(this.state.pos * (csv[1][0].length - 1) / 5);
        for (let i = r; i >= l; --i) {
          if (!csv[1][0][i] || csv[1][0][i] === "--" || csv[1][1][i] === "--" || csv[2][14][i] === "--" || csv[2][14][i + 1] === "--") continue;
          let pingjunzongzichan = Math.floor(parseInt(csv[2][14][i]) + parseInt(csv[2][14][i + 1] ? csv[2][14][i + 1] : csv[2][14][i]) / 2);
          let t = new Date(csv[1][0][i]).format("yyyy年MM月dd日");
          const zhouzhuanlv = parseFloat((parseInt(csv[1][1][i]) / pingjunzongzichan * 100).toFixed(2));
          const zzlhb = parseFloat(((zhouzhuanlv - (last_zzl === 0 ? zhouzhuanlv : last_zzl)) / (last_zzl === 0 ? zhouzhuanlv : last_zzl) * 100).toFixed(2));
          data.push({name: "产品销售收入（万）", shijian: t, fenzu: parseInt(csv[1][1][i])});
          data.push({name: "平均总资产（万）", shijian: t, fenzu: pingjunzongzichan});
          data.push({name: "总资产周转率（%）", shijian: t, zhouzhuanlv: zhouzhuanlv});
          data.push({name: "总资产周转率环比（%）", shijian: t, zzlhb: zzlhb});
          maxR = Math.max(maxR, zhouzhuanlv);
          maxR = Math.max(maxR, zzlhb);
          minR = Math.min(minR, zhouzhuanlv);
          minR = Math.min(minR, zzlhb);
          last_zzl = zhouzhuanlv;
        }
        scale = {
          shijian: { alias: "报告日期" },
          fenzu: { type: "log" },
          zhouzhuanlv: { type: "linear", min: minR * 1.2, max: maxR * 1.2 },
          zzlhb: { type: "linear", min: minR * 1.2, max: maxR * 1.2 }
        };
        return (
          <Chart data={data} scale={scale} forceFit>
            <Legend />
            <Tooltip />
            <Axis name="shijian" title />
            <Axis name="fenzu" position="left" />
            <Axis name="zhouzhuanlv" position="right" />
            <Axis name="zzlhb" visible={false} />
            <Geom type="interval" position="shijian*fenzu" color={"name"} adjust={[{type: "dodge"}]} />
            <Geom type="line" position="shijian*zhouzhuanlv" color={"name"} />
            <Geom type="line" position="shijian*zzlhb" color={"name"} />
          </Chart>
        );
      case 2:
        l = Math.floor((this.state.pos - 1) * (csv[1][0].length - 1) / 5 + 1);
        r = Math.floor(this.state.pos * (csv[1][0].length - 1) / 5);
        for (let i = r; i >= l; --i) {
          if (!csv[1][0][i] || csv[1][0][i] === "--" || csv[1][1][i] === "--" || csv[0][37][i] === "--") continue;
          let t = new Date(csv[1][0][i]).format("yyyy年MM月dd日");
          const zhouzhuanlv = parseFloat((parseInt(csv[1][1][i]) / parseInt(csv[0][37][i]) * 100).toFixed(2));
          const zzlhb = parseFloat(((zhouzhuanlv - (last_zzl === 0 ? zhouzhuanlv : last_zzl)) / (last_zzl === 0 ? zhouzhuanlv : last_zzl) * 100).toFixed(2));
          data.push({name: "产品销售收入（万）", shijian: t, fenzu: parseInt(csv[1][1][i])});
          data.push({name: "固定资产总额（万）", shijian: t, fenzu: parseInt(csv[0][37][i])});
          data.push({name: "固定资产周转率（%）", shijian: t, zhouzhuanlv: zhouzhuanlv});
          data.push({name: "总资产周转率环比（%）", shijian: t, zzlhb: zzlhb});
          maxR = Math.max(maxR, zhouzhuanlv);
          maxR = Math.max(maxR, zzlhb);
          minR = Math.min(minR, zhouzhuanlv);
          minR = Math.min(minR, zzlhb);
          last_zzl = zhouzhuanlv;
        }
        scale = {
          shijian: { alias: "报告日期" },
          fenzu: { type: "linear" },
          zhouzhuanlv: { type: "linear", min: minR * 1.2, max: maxR * 1.2 },
          zzlhb: { type: "linear", min: minR * 1.2, max: maxR * 1.2 }
        };
        return (
          <Chart data={data} scale={scale} forceFit>
            <Legend />
            <Tooltip />
            <Axis name="shijian" title />
            <Axis name="fenzu" position="left" />
            <Axis name="zhouzhuanlv" position="right" />
            <Axis name="zzlhb" visible={false} />
            <Geom type="interval" position="shijian*fenzu" color={"name"} adjust={[{type: "dodge"}]} />
            <Geom type="line" position="shijian*zhouzhuanlv" color={"name"} />
            <Geom type="line" position="shijian*zzlhb" color={"name"} />
          </Chart>
        );
      case 3:
        l = Math.floor((this.state.pos - 1) * (csv[1][0].length - 1) / 5 + 1);
        r = Math.floor(this.state.pos * (csv[1][0].length - 1) / 5);
        for (let i = r; i >= l; --i) {
          if (!csv[1][0][i] || csv[1][0][i] === "--" || csv[1][1][i] === "--" || csv[0][7][i] === "--" || !csv[0][7][i] || csv[0][7][i] === "0") continue;
          let t = new Date(csv[1][0][i]).format("yyyy年MM月dd日");
          const zhouzhuanlv = parseFloat((parseInt(csv[1][1][i]) / parseInt(csv[0][7][i]) * 100).toFixed(2));
          const zzlhb = parseFloat(((zhouzhuanlv - (last_zzl === 0 ? zhouzhuanlv : last_zzl)) / (last_zzl === 0 ? zhouzhuanlv : last_zzl) * 100).toFixed(2));
          data.push({name: "产品销售收入（万）", shijian: t, fenzu: parseInt(csv[1][1][i])});
          data.push({name: "应收账款总额（万）", shijian: t, fenzu: parseInt(csv[0][7][i])});
          data.push({name: "应收账款总额周转率（%）", shijian: t, zhouzhuanlv: zhouzhuanlv});
          data.push({name: "应收账款总额周转率环比（%）", shijian: t, zzlhb: zzlhb});
          maxR = Math.max(maxR, zhouzhuanlv);
          maxR = Math.max(maxR, zzlhb);
          minR = Math.min(minR, zhouzhuanlv);
          minR = Math.min(minR, zzlhb);
          last_zzl = zhouzhuanlv;
        }
        scale = {
          shijian: { alias: "报告日期" },
          fenzu: { type: "linear" },
          zhouzhuanlv: { type: "linear", min: minR * 1.2, max: maxR * 1.2 },
          zzlhb: { type: "linear", min: minR * 1.2, max: maxR * 1.2 }
        };
        return (
          <Chart data={data} scale={scale} forceFit>
            <Legend />
            <Tooltip />
            <Axis name="shijian" title />
            <Axis name="fenzu" position="left" />
            <Axis name="zhouzhuanlv" position="right" />
            <Axis name="zzlhb" visible={false} />
            <Geom type="interval" position="shijian*fenzu" color={"name"} adjust={[{type: "dodge"}]} />
            <Geom type="line" position="shijian*zhouzhuanlv" color={"name"} />
            <Geom type="line" position="shijian*zzlhb" color={"name"} />
          </Chart>
        );
      case 4:
        l = Math.floor((this.state.pos - 1) * (csv[1][0].length - 1) / 5 + 1);
        r = Math.floor(this.state.pos * (csv[1][0].length - 1) / 5);
        for (let i = r; i >= l; --i) {
          if (!csv[1][0][i] || csv[1][0][i] === "--" || csv[1][8][i] === "--" || csv[0][20][i] === "--" || csv[0][20][i + 1] === "--" || !csv[0][20][i] || !csv[0][20][i + 1]) continue;
          let pingjuncunhuo = Math.floor(parseInt(csv[0][20][i]) + parseInt(csv[0][20][i + 1] ? csv[0][20][i + 1] : csv[0][20][i]) / 2);
          let t = new Date(csv[1][0][i]).format("yyyy年MM月dd日");
          const zhouzhuanlv = parseFloat((parseInt(csv[1][8][i]) / pingjuncunhuo * 100).toFixed(2));
          const zzlhb = parseFloat(((zhouzhuanlv - (last_zzl === 0 ? zhouzhuanlv : last_zzl)) / (last_zzl === 0 ? zhouzhuanlv : last_zzl) * 100).toFixed(2));
          data.push({name: "产品销售收入（万）", shijian: t, fenzu: parseInt(csv[1][8][i])});
          data.push({name: "平均存货总额（万）", shijian: t, fenzu: pingjuncunhuo});
          data.push({name: "存货周转率（%）", shijian: t, zhouzhuanlv: zhouzhuanlv});
          data.push({name: "存货周转率环比（%）", shijian: t, zzlhb: zzlhb});
          maxR = Math.max(maxR, zhouzhuanlv);
          maxR = Math.max(maxR, zzlhb);
          minR = Math.min(minR, zhouzhuanlv);
          minR = Math.min(minR, zzlhb);
          last_zzl = zhouzhuanlv;
        }
        scale = {
          shijian: { alias: "报告日期" },
          fenzu: { type: "log" },
          zhouzhuanlv: { type: "linear", min: minR * 1.2, max: maxR * 1.2 },
          zzlhb: { type: "linear", min: minR * 1.2, max: maxR * 1.2 }
        };
        return (
          <Chart data={data} scale={scale} forceFit>
            <Legend />
            <Tooltip />
            <Axis name="shijian" title />
            <Axis name="fenzu" position="left" />
            <Axis name="zhouzhuanlv" position="right" />
            <Axis name="zzlhb" visible={false} />
            <Geom type="interval" position="shijian*fenzu" color={"name"} adjust={[{type: "dodge"}]} />
            <Geom type="line" position="shijian*zhouzhuanlv" color={"name"} />
            <Geom type="line" position="shijian*zzlhb" color={"name"} />
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
          titles={["总资产周转率走势", "企业固定资产周转率走势", "企业应收账款周转率走势", "企业存货周转率走势"]}
          that={this}
        />
        <this.renderChart />
      </div>
    );
  }
}

export default Operation;