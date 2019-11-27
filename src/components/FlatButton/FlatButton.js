import React from "react";
import styles from "./index.module.less";

import { NavLink } from "react-router-dom";

class FlatButton extends React.Component {
  render() {
    const component = (
      <div className={styles.whole} style={this.props.style} onClick={this.props.onClick}>
        {this.props.text}
      </div>
    );
    if (this.props.href) return <NavLink to={this.props.href}>{component}</NavLink>
    else return component;
  }
}

export default FlatButton;