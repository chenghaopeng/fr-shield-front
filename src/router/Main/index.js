import React from "react";
import styles from "./index.module.less";
import Frame from "../../components/Frame";
import logo from "../../themes/logo.png";
import slogan from "../../themes/slogan.png";

class Main extends React.Component {
  render() {
    const component = (
      <div className={styles.whole}>
        <div className={`${styles.defaultBox} ${styles.main}`}>
          <img className={styles.logo} src={logo} alt="logo" />
          <img className={styles.slogan} src={slogan} alt="slogan" />
        </div>
      </div>
    );
    return (<Frame node={component}/>);
  }
}

export default Main;