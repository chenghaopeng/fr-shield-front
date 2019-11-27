import React from "react";
import styles from "./index.module.less";
import Frame from "../../components/Frame";
import { withRouter } from "react-router"

class Stocks extends React.Component {
  render() {
    const component = (
      <div className={styles.whole}>
        
      </div>
    );
    return <Frame node={component} title="股票浏览" />
  }
}

export default withRouter(Stocks);