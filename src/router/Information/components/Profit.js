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
            <Axis name="jinglirun" />
            <Axis name="shouyilv" />
            <Geom type="interval" position="shijian*jinglirun" color={"#7B6FEC"} />
            <Geom type="line" position="shijian*shouyilv" color={"#5BC2F3"} />
            <Geom type="point" position="shijian*shouyilv" color={"#5BC2F3"} size={4} shape={"circle"} style={{ stroke: "#fff", lineWidth: 1 }} />
          </Chart>
        );
      case 2:
        let mxpjzzc = 0, mxlv = 0;
        l = Math.floor((this.state.pos - 1) * (csv[2][0].length - 1) / 5 + 1);
        r = Math.floor(this.state.pos * (csv[2][0].length - 1) / 5);
        for (let i = r; i >= l; --i) {
          if (!csv[2][0][i] || csv[2][0][i] === "--" || csv[2][9][i] === "--" || csv[2][10][i] === "--" || csv[2][14][i] === "--" || csv[2][14][i + 1] === "--") continue;
          let pingjunzongzichan = Math.floor(parseInt(csv[2][14][i]) + parseInt(csv[2][14][i + 1] ? csv[2][14][i + 1] : csv[2][14][i]) / 2);
          data.push({
            shijian: new Date(csv[2][0][i]).format("yyyy年MM月dd日"),
            jinglirun: parseInt(csv[2][10][i]),
            zonglirun: parseInt(csv[2][9][i]),
            pingjunzongzichan: pingjunzongzichan,
            lirunlv: (parseInt(csv[2][9][i]) / pingjunzongzichan * 100).toFixed(2),
            jinglirunlv: (parseInt(csv[2][10][i]) / pingjunzongzichan * 100).toFixed(2)
          });
          mxpjzzc = Math.max(mxpjzzc, pingjunzongzichan);
          mxlv = Math.max(mxlv, (parseInt(csv[2][9][i]) / pingjunzongzichan * 100).toFixed(2));
          mxlv = Math.max(mxlv, (parseInt(csv[2][10][i]) / pingjunzongzichan * 100).toFixed(2));
        }
        mxpjzzc = Math.floor(mxpjzzc * 1.25);
        mxlv = Math.floor(mxlv * 1.25);
        scale = {
          shijian: { alias: "报告日期" },
          jinglirun: { alias: "净利润（万）", type: "log", min: 0, max: mxpjzzc },
          zonglirun: { alias: "总利润（万）", type: "log", min: 0, max: mxpjzzc },
          pingjunzongzichan: { alias: "平均总资产（万）", type: "log", min: 0, max: mxpjzzc },
          lirunlv: { alias: "总资产利润率（%）", type: "linear", min: 0, max: mxlv },
          jinglirunlv: { alias: "总资产净利润率（%）", type: "linear", min: 0, max: mxlv },
        };
        return (
          <Chart data={data} scale={scale} forceFit>
            <Legend />
            <Tooltip />
            <Axis name="shijian" title />
            <Axis name="jinglirun" position={"left"} />
            <Axis name="zonglirun" position={"left"}/>
            <Axis name="pingjunzongzichan" position={"left"} />
            <Axis name="lirunlv" position={"right"} />
            <Axis name="jinglirunlv" position={"right"} />
            <Geom type="line" position="shijian*jinglirun" color={"#786DE8"} style={{ lineWidth: 5 }} />
            <Geom type="point" position="shijian*jinglirun" color={"#786DE8"} size={8} shape={"circle"} style={{ stroke: "#fff", lineWidth: 1 }} />
            <Geom type="line" position="shijian*zonglirun" color={"#5BC2F3"} style={{ lineWidth: 5 }} />
            <Geom type="point" position="shijian*zonglirun" color={"#5BC2F3"} size={8} shape={"circle"} style={{ stroke: "#fff", lineWidth: 1 }} />
            <Geom type="line" position="shijian*pingjunzongzichan" color={"#45B684"} style={{ lineWidth: 5 }} />
            <Geom type="point" position="shijian*pingjunzongzichan" color={"#45B684"} size={8} shape={"circle"} style={{ stroke: "#fff", lineWidth: 1 }} />
            <Geom type="line" position="shijian*lirunlv" color={"#F9588A"} />
            <Geom type="point" position="shijian*lirunlv" color={"#F9588A"} size={4} shape={"circle"} style={{ stroke: "#fff", lineWidth: 1 }} />
            <Geom type="line" position="shijian*jinglirunlv" color={"#F8D42B"} />
            <Geom type="point" position="shijian*jinglirunlv" color={"#F8D42B"} size={4} shape={"circle"} style={{ stroke: "#fff", lineWidth: 1 }} />
          </Chart>
        );
      case 3:
        l = Math.floor((this.state.pos - 1) * (csv[2][0].length - 1) / 5 + 1);
        r = Math.floor(this.state.pos * (csv[2][0].length - 1) / 5);
        for (let i = r; i >= l; --i) {
          if (!csv[2][0][i] || csv[2][0][i] === "--" || csv[2][10][i] === "--" || parseInt(csv[2][18][i]) === 0 || csv[2][18][i] === "--") continue;
          const t = new Date(csv[2][0][i]).format("yyyy年MM月dd日");
          data.push({name: "净利润", shijian: t, fenzu: parseInt(csv[2][10][i])});
          data.push({name: "平均所有者权益", shijian: t, fenzu: parseInt(csv[2][18][i])});
          data.push({name: "所有者权益报酬率", shijian: t, baochoulv: parseFloat((parseInt(csv[2][10][i]) / parseInt(csv[2][18][i]) * 100).toFixed(2))});
        }
        scale = {
          shijian: { alias: "报告日期" }
        };
        return (
          <Chart data={data} scale={scale} forceFit>
            <Legend />
            <Tooltip />
            <Axis name="shijian" title />
            <Axis name="fenzu" />
            <Axis name="baochoulv" />
            <Geom type="interval" position="shijian*fenzu" color={"name"} adjust={[{type: "dodge"}]} />
            <Geom type="line" position="shijian*baochoulv" color={"name"} />
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