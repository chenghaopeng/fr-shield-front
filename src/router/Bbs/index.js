import React, { Component } from "react";
import styles from "./index.module.less";
import { withRouter } from "react-router-dom";

import WithHeader from "../../component/WithHeader";

class Bbs extends Component {
  render() {
    return (
      <p>论坛</p>
    );
  }
}

export default WithHeader(withRouter(Bbs), "论坛");