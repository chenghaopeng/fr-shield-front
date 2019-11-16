import React from "react";

import { Tabs } from "antd";

export default function TabBar(props) {
  const withStyle = (str) => {
    return (
      <div style={{fontSize: "2.5vh"}}>
        {str}
      </div>
    );
  }
  const handleTabChange = (activeKey) => {
    props.that.setState({...props.that.state, id: parseInt(activeKey)});
  }
  return (
    <Tabs defaultActiveKey={"1"} style={{width: "100%"}} onChange={handleTabChange} type="card">
      {props.titles.map((item, index) => {
        return <Tabs.TabPane tab={withStyle(item)} key={(index + 1).toString()} />
      })}
    </Tabs>
  );
}