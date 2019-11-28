import React from "react";

import { Tabs, Slider } from "antd";

export default function TabBar(props) {
  const withStyle = (str) => {
    return (
      <div style={{fontSize: "1em"}}>
        {str}
      </div>
    );
  }
  const handleTabChange = (activeKey) => {
    props.that.setState({...props.that.state, id: parseInt(activeKey)});
  }
  const handleSliderChange = (value) => {
    props.that.setState({...props.that.state, pos: 6 - value});
  }
  return (
    <div>
      <Tabs defaultActiveKey={"1"} style={{width: "100%"}} onChange={handleTabChange}>
        {props.titles.map((item, index) => {
          return <Tabs.TabPane tab={withStyle(item)} key={(index + 1).toString()} />
        })}
      </Tabs>
      <Slider onChange={handleSliderChange} min={1} max={5} step={1} />
    </div>
  );
}