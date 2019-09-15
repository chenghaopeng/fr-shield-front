import React, { Component } from "react";
import styles from "./index.module.less";
import { withRouter } from "react-router-dom";

import WithHeader from "../../component/WithHeader";

class Forum extends Component {
  render() {
    return (<div>aaa</div>);
  }
}

export default WithHeader(withRouter(Forum), "用户论坛");