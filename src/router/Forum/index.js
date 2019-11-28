import React from "react";
import styles from "./index.module.less";
import Frame from "../../components/Frame";
import { withRouter } from "react-router"
import Posts from "../../utils/posts";
import { Comment, Avatar, Button, Input, message } from "antd";
import MdCreate from "react-ionicons/lib/MdCreate";
import IosCreateOutline from "react-ionicons/lib/IosCreateOutline";

class Forum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {view: -1};
  }
  handleView = (id) => {
    this.setState({...this.state, view: id});
  }
  showForbdiden = () => {
    message.error("当前所在用户组没有该权限！");
  }
  showComment = () => {
    const post = Posts[this.state.view];
    return (
      <div className={styles.comments}>
        <div className={styles.head}>评论区</div>
        {post.comment.length === 0 ? <div style={{marginTop: ".5em"}}>暂时没有评论</div> :
          post.comment.map((item, index) => {
          return (
            <Comment key={index} author={<div className={styles.name}>{item.name}</div>} avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt={item.name} size={48}/>}
              content={<div className={styles.content}>{item.content}</div>} datetime={<div className={styles.time}>{item.time}</div>}/>
          );
        })}
        <Button className={styles.submit} type="primary" onClick={this.showForbdiden}><MdCreate className={styles.icon} fontSize="1.2em" color="white"/>发表新回复</Button>
        <Input.TextArea className={styles.input} rows={8}/>
      </div>
    );
  }
  render() {
    const component = (
      <div className={styles.whole}>
        <div className={`${styles.defaultBox} ${styles.cursorPointer} ${styles.publish}`} onClick={this.showForbdiden}>
          <IosCreateOutline fontSize="1.5em" style={{marginRight: ".5em"}}/>发布新帖子
        </div>
        {Posts.map((item, index) => {
          return (
            <div className={`${styles.defaultBox} ${styles.post} ${this.state.view !== index ? styles.cursorPointer : ""}`} key={index} onClick={this.handleView.bind(this, index)}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.time}>发布时间：{item.time}</div>
              <div className={styles.content} dangerouslySetInnerHTML={{ __html: this.state.view === index ? item.content.replace(/\n/g, "<br/>") : ((item.content.length > 100 ? item.content.substr(0, 100) : item.content) + "...") }}></div>
              {this.state.view !== index ? <div className={styles.expand}>展开全文↓</div> : ""}
              {this.state.view === index ? this.showComment() : ""}
            </div>
          );
        })}
      </div>
    );
    return <Frame node={component} title="用户论坛" />
  }
}

export default withRouter(Forum);