import React, { Component } from "react";
import styles from "./index.module.less";

import IosRefresh from "react-ionicons/lib/IosRefresh";

export default function ImportantIndex() {
  return (
    <div className={styles.whole}>
      <div className={styles.item}>
        <IosRefresh fontSize="10vh" color="rgb(89, 77, 73)" rotate={true}/>
        DSRI
      </div>
      <div className={styles.item}>
        <IosRefresh fontSize="10vh" color="rgb(89, 77, 73)" rotate={true}/>
        GMI
      </div>
      <div className={styles.item}>
        <IosRefresh fontSize="10vh" color="rgb(89, 77, 73)" rotate={true}/>
        AQI
      </div>
      <div className={styles.item}>
        <IosRefresh fontSize="10vh" color="rgb(89, 77, 73)" rotate={true}/>
        SGI
      </div>
      <div className={styles.item}>
        <IosRefresh fontSize="10vh" color="rgb(89, 77, 73)" rotate={true}/>
        DEPI
      </div>
    </div>
  );
}