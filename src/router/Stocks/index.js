import React from "react";
import styles from "./index.module.less";
import Frame from "../../components/Frame";
import { withRouter } from "react-router"
import { Stocks as stocks } from "../../utils/stocks";
import { Pagination, List } from "antd";
import { NavLink } from "react-router-dom";

class Stocks extends React.Component {
  constructor(props) {
    super(props);
    let stock = [];
    stocks.map(item => stock.push([item[0], item[1], item[2]]));
    stock.sort((a, b) => { return parseInt(a[0]) - parseInt(b[0]); });
    this.state = {stock: stock, current: 1, pageSize: 50};
  }
  onShowSizeChange = (current, pageSize) => {
    this.setState({...this.state, pageSize: pageSize});
  }
  onChange = (page, pageSize) => {
    this.setState({...this.state, current: page});
  }
  renderStocks = () => {
    const data = [];
    for (let i = (this.state.current - 1) * this.state.pageSize + 1; i <= this.state.current * this.state.pageSize && i < this.state.stock.length; ++i) {
      data.push(this.state.stock[i]);
    }
    return (
      <List className={styles.list} size="small" bordered dataSource={data} renderItem={item => <NavLink to={"/analysis/" + item[0]}><List.Item className={`${styles.item} ${styles.cursorPointer}`}>{item[0] + "：" + item[1] + "，" + item[2]}</List.Item></NavLink>} />
    );
  }
  render() {
    const component = (
      <div className={styles.whole}>
        <div className={`${styles.defaultBox} ${styles.stocks}`}>
          <Pagination onShowSizeChange={this.onShowSizeChange} onChange={this.onChange} defaultCurrent={1} total={this.state.stock.length} showSizeChanger defaultPageSize={100} pageSizeOptions={['100', '200', '300', '400', '500']} />
          <this.renderStocks />
        </div>
      </div>
    );
    return <Frame node={component} title="股票浏览" />
  }
}

export default withRouter(Stocks);