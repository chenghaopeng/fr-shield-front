import React from "react";

import { Chart, Axis, Tooltip, Geom } from "bizcharts";

import TabBar from "./TabBar";

class Profit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {id: 1};
  }
  renderChart = () => {
    const { csv } = this.props;
    console.log(csv);
    switch (this.state.id) {
      case 1:
        let data = [], cols = [{
          shijian: { alias: "报告日期" },
          jinglirun: { alias: "净利润" },
          shouyilv: { alias: "收益率" }
        }];
        for (let i = csv[2][0].length - 1; i >= 1; --i) {
          data.push({shijian: csv[2][0][i], jinglirun: csv[2][10][i], shouyilv: csv[2][19][i]});
        }
        return (
          <Chart data={data} scale={cols}>
            <Axis name="shijian" />
            <Axis name="jinglirun" />
            <Axis name="shouyilv" />
            <Geom type="interval" position="shijian*(jinglirun+shouyilv)" />
          </Chart>
        );
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