import React, { Component } from "react";
import styles from "./index.module.less";

export default function RiskContrast() {
  const GetRisk = r => {
    if (r > .8) return styles.risk5;
    if (r > .6) return styles.risk4;
    if (r > .4) return styles.risk3;
    if (r > .2) return styles.risk2;
    return styles.risk1;
  }
  const ToItem = props => {
    return (
      <div className={`${styles.item} ${props.first? '': GetRisk(props.risk)}`}>
        <div className={styles.left}>
          {props.title}
        </div>
        {props.first? ``:<div className={styles.right}>信任</div>}
      </div>
    );
  }
  return (
    <div className={styles.whole}>
      <ToItem title="问题名称" first={true}/>
      <ToItem title="出具非标准统计意见" risk=".3"/>
      <ToItem title="出具非标准统计意见" risk=".7"/>
      <ToItem title="出具非标准统计意见" risk=".8"/>
      <ToItem title="出具非标准统计意见" risk=".4"/>
      <ToItem title="出具非标准统计意见" risk=".6"/>
      <ToItem title="出具非标准统计意见" risk=".0"/>
      <ToItem title="出具非标准统计意见" risk="1"/>
      <ToItem title="出具非标准统计意见" risk=".1"/>
      <ToItem title="出具非标准统计意见" risk=".5"/>
      <ToItem title="出具非标准统计意见" risk=".2"/>
      <ToItem title="出具非标准统计意见" risk=".9"/>
    </div>
  );
}