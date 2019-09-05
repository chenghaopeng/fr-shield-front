import React, { Component } from "react"
import styles from "./index.module.less";

import Header from "../Header"

export default function WithHeader(WrappedComponent, Title) {
  return class extends Component {
    render() {
      return (
        <div className={styles.whole}>
          <Header title={Title}/>
          <div className={styles.content}>
            <WrappedComponent/>
          </div>
        </div>
      );
    }
  }
}