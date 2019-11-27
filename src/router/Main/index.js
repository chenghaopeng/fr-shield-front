import React from "react";
import styles from "./index.module.less";
import Frame from "../../components/Frame";

class Main extends React.Component {
  render() {
    const component = (
      <div className={styles.whole}>
        这里是首页，需要一些展示性的东西，比如项目介绍，logo啥的
      </div>
    );
    return (<Frame node={component}/>);
  }
}

export default Main;