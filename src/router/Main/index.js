import React from "react";
import styles from "./index.module.less";
import Frame from "../../components/Frame";
import logo from "../../themes/logo.png";

class Main extends React.Component {
  render() {
    const component = (
      <div className={styles.whole}>
        <div className={`${styles.defaultBox} ${styles.main}`}>
          <img src={logo} alt="logo" />
        </div>
      </div>
    );
    return (<Frame node={component}/>);
  }
}

export default Main;