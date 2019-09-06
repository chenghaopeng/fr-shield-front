import React, { Component } from "react";
import styles from "./index.module.less";
import { withRouter } from "react-router-dom";

import WithHeader from "../../component/WithHeader";

class Information extends Component {
  render() {
    return (
      <p>信息展示</p>
    );
  }
}

export default WithHeader(withRouter(Information), "信息展示");