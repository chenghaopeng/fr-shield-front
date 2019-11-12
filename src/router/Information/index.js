import React, { Component } from "react";
import styles from "./index.module.less";
import { withRouter } from "react-router-dom";
import { Skeleton } from "antd";

import WithHeader from "../../component/WithHeader";
import { information } from "../../services/apiHTTP";

class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {got: 0, data: {}};
  }

  componentWillMount() {
    information({stock: "000001"}).then(res => {
      if (res.code === 0) {
        this.setState({got: 1, data: res.data});
      }
      else {
        this.setState({got: 0, data: {}});
      }
    });
  }
  
  render() {
    return (
      <div className={styles.whole}>
        {this.state.got === 1 ? JSON.stringify(this.state) : <div className={styles.skeleton}><Skeleton active /></div>}
      </div>
    );
  }
}

export default WithHeader(withRouter(Information), "数据分析");