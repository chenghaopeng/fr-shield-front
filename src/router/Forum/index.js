import React from "react";
import styles from "./index.module.less";
import Frame from "../../components/Frame";
import { withRouter } from "react-router"

class Forum extends React.Component {
  render() {
    const component = (
      <div className={styles.whole}>
        
      </div>
    );
    return <Frame node={component} title="用户论坛" />
  }
}

export default withRouter(Forum);