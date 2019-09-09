import React, { Component } from "react";
import styles from "./index.module.less";
import { withRouter } from "react-router-dom";

import WithHeader from "../../component/WithHeader";
import { information } from "../../services/apiHTTP";

class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    information().then(res => {
      if (res.code === 0) {
        this.setState(res.data);
        //alert(JSON.stringify(this.state));
      }
      else {
        this.setState({data: {}});
      }
    });
  }
  
  render() {
    return (
      <div className={styles.whole}>
        {JSON.stringify(this.state)}
      </div>
    );
  }
}

export default WithHeader(withRouter(Information), "信息展示");