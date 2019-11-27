import React from "react";
import styles from "./index.module.less";
import Frame from "../../components/Frame";
import { withRouter } from "react-router"

class Analysis extends React.Component {
  render() {
    const component = (
      <div className={styles.whole}>
        
      </div>
    );
    return <Frame node={component} title={"综合分析 " + this.state.stockname} />
  }
}

export default withRouter(Analysis);