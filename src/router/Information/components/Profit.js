import React from "react";

import TabBar from "./TabBar";

class Profit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {id: 1};
  }
  renderChart = () => {
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