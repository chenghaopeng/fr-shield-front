import React, { Component } from "react";
import styles from "./index.module.less";
import { Statistic } from "antd";

import IosRefresh from "react-ionicons/lib/IosRefresh";

const indexName = ["RTR", "DSRI", "GMI", "AQI", "SGI", "DEPI", "SGAI", "LVGI", "TATA", "CH_REC", "CH_INV", "Soft_as", "CH_CS", "CH_ROA", "ISSUE", "OTHREC", "STKCYC", "LOSS"];

export default function ImportantIndex(props) {
  const { data } = props;
  return (
    <div className={styles.whole}>
      {
        indexName.map((item, index) => {
          return (
            <Statistic className={styles.item} title={item} value={data.got === 1 ? parseFloat(data.my.index[index]).toFixed(3) : "0"}
            formatter={value => (data.got === 1 ? value : data.got === 0 ? <IosRefresh fontSize="4vh" color="rgb(89, 77, 73)" rotate={true}/> : "No Data")} />
          );
        })
      }
    </div>
  );
}