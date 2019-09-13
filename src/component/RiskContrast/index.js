import React, { Component } from "react";
import styles from "./index.module.less";
import { Spin, Empty } from "antd";

export default function RiskContrast(props) {
  const { data } = props.that.state;

  const trust = (index) => {
    props.that.setState({...props.that.state, trusted: [...props.that.state.trusted, index], data: {...props.that.state.data, my: {...props.that.state.data.my, grade: props.that.state.data.my.grade + props.that.state.data.my.problem[index][2]}}});
  }

  const GetRisk = r => {
    if (r === 0) return styles.risk0;
    if (r === 1) return styles.risk1;
    if (r === 2) return styles.risk2;
    if (r === 3) return styles.risk3;
    if (r === 4) return styles.risk4;
    if (r === 5) return styles.risk5;
    if (r === 6) return styles.risk6;
    if (r === 7) return styles.risk7;
    if (r === 8) return styles.risk8;
    if (r === 9) return styles.risk9;
    return styles.risk10;
  }

  const ToItem = props => {
    return (
      <div className={`${styles.item} ${props.first? styles.first : GetRisk(props.risk)}`}>
        <div className={styles.left}>
          {props.title}
        </div>
        {props.first? "":<div className={styles.right} onClick={trust.bind(this, props.index)}>信任</div>}
      </div>
    );
  }
  
  return (
    <div className={styles.whole}>
      {data.got !== 1 ? "" : <ToItem title={data.my.problem.length - props.that.state.trusted.length > 0 ? "问题名称 (" + (data.my.problem.length - props.that.state.trusted.length) + " 个问题)" : "没有发现问题！"} first={true}/>}
      {
        data.got === 1 ? 
          data.my.problem.map((item, index) => {
            if (props.that.state.trusted.indexOf(index) === -1) {
              return <ToItem title={item[1]} risk={item[2]} index={index}/>;
            }
          })
         : (data.got === 0 ? <Spin size="large"/> : <Empty/>)
      }
    </div>
  );
}