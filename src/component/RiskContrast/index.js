import React, { Component } from "react";
import styles from "./index.module.less";
import { Spin, Empty } from "antd";

export default function RiskContrast(props) {
  const { data } = props.that.state;

  const degreeToGrade = (degree) => {
    if (degree === 10) return 1.9;
    if (degree === 8) return 1.2;
    if (degree === 6) return .7;
    if (degree === 4) return .2;
    if (degree === 2) return .1;
    return 0;
  }

  const trust = (index) => {
    props.that.setState({...props.that.state, trusted: [...props.that.state.trusted, index], data: {...props.that.state.data, my: {...props.that.state.data.my, grade: props.that.state.data.my.grade + degreeToGrade(props.that.state.data.my.problem[index][0])}}});
  }

  const GetRisk = r => {
    if (r === 0) return styles.risk0;
    if (r === 2) return styles.risk2;
    if (r === 4) return styles.risk4;
    if (r === 6) return styles.risk6;
    if (r === 8) return styles.risk8;
    return styles.risk10;
  }

  const ToItem = props => {
    return (
      <div className={`${styles.item} ${props.first? styles.first : GetRisk(props.risk)}`}>
        <div className={styles.left}>
          {(props.first ? "" : ((props.risk === 0 ? "○" : "×") + " ")) + props.title}
        </div>
        {props.first || props.risk === 0 ? "":<div className={styles.right} onClick={trust.bind(this, props.index)}>信任</div>}
      </div>
    );
  }
  
  return (
    <div className={styles.whole}>
      {data.got !== 1 ? "" : <ToItem title={data.my.problem.length - props.that.state.trusted.length > 0 ? "对比项名称 (" + (data.my.problem.length - props.that.state.trusted.length) + " 项)" : "没有对比项！"} first={true}/>}
      {
        data.got === 1 ? 
          data.my.problem.map((item, index) => {
            if (props.that.state.trusted.indexOf(index) === -1) {
              return <ToItem title={item[1]} risk={item[0]} index={index}/>;
            }
          })
         : (data.got === 0 ? <Spin size="large"/> : <Empty/>)
      }
    </div>
  );
}