import React from "react";
import styles from "./index.module.less";
import { withRouter } from "react-router"
import FlatButton from "../FlatButton/FlatButton";
import { Input, message } from "antd";

class Frame extends React.Component {
  handleSearch = (e) => {
    if (e.keyCode === 13) {
      const stock = e.target.value.trim();
      if (stock === "") {
        message.error("请输入股票名称或代码！");
        return;
      }
      this.props.history.push("/analysis/" + stock);
    }
  }
  render() {
    return (
      <div className={styles.whole}>
        <div className={styles.header}>
          <div className={styles.title}>
            FR Shield
          </div>
          <div className={styles.navigator}>
            <FlatButton text="首 页" href="/" />
            <FlatButton text="股票浏览" href="/stocks" />
            <FlatButton text="用户论坛" href="/forum" />
            <FlatButton text="个人中心" href="/user" />
          </div>
        </div>
        <div className={styles.searchBox}>
          <Input className={`${styles.defaultShadowBox} ${styles.searchText}`} placeholder="搜索股票名称或代码.." onKeyDown={this.handleSearch} />
        </div>
        <div className={styles.content}>
          {this.props.node}
        </div>
      </div>
    );
  }
}

export default withRouter(Frame);