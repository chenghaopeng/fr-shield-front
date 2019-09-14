import React, { Component } from "react";
import styles from "./index.module.less";
import { withRouter } from "react-router-dom";
import { Radio, Checkbox, Button, message } from "antd";

import WithHeader from "../../component/WithHeader";
import { uploadMark } from "../../services/apiHTTP";

const Question = [
  {
    title: "您对当前的经济形势持什么样的态度？",
    choice: ["乐观", "悲观", "无所谓，平平常常"],
    score: [10, 0, 7]
  },
  {
    title: "您认为中国的刘易斯拐点将在何时到来？",
    choice: ["已经到来了", "就在不久的将来", "距离刘易斯拐点还有很长一段时间"],
    score: [0, 4, 10]
  },
  {
    title: "您认为影响企业运营发展的最重要因素是？",
    choice: ["经济环境", "政治环境", "高层管理人员", "其他因素"],
    score: [5, 3, 7, 1]
  },
  {
    title: "您认为证券等相关监管部门的监管力度怎么样？",
    choice: ["强，且还在增强", "强 但是最近力度有所下滑", "弱，但是在增强", "弱 且无动于衷"],
    score: [10, 4, 5, 0]
  },
  {
    title: "您认为当前大部分企业面临的环境包括以下哪些情况？（多选）",
    choice: ["流动性收紧", "信用收紧", "进入加息周期", "贸易战导致的巨大冲击"],
    score: [3, 3, 3, 1]
  },
  {
    title: "您认为当前国际形势对国内经济的严峻程度？",
    choice: ["非常严峻", "提出挑战，但是能渡过难关", "不足为虑"],
    score: [1, 7, 10]
  },
  {
    title: "您认为风险对您而言意味着什么？",
    choice: ["亏损", "机遇", "不确定", "兴奋"],
    score: [1, 8, 4, 10]
  },
  {
    title: "您投资的主要目的是？",
    choice: ["确保资产的安全性,同时获得固定收益", "倾向于长期的成长，较少关心短期的回报和波动", "寻求高额的回报"],
    score: [3, 4, 8]
  },
  {
    title: "您独自外出旅游，遇到三叉路口您会怎么选择？",
    choice: ["仔细研究地图和路标后作判断", "招人问路", "凭借经验认定", "随遇而安"],
    score: [3, 4, 8, 10]
  },
  {
    title: "如果需要把大量现金放在口袋携带一整天，您是什么样的感觉？",
    choice: ["惶惶不安", "适度的紧张", "安之若素"],
    score: [0, 4, 9]
  },
];

class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {ans: [0, 0, 0, 0, [], 0, 0, 0, 0, 0]};
  }

  componentWillMount() {
    message.info("现在我们需要您完成一份调查问卷，以便您更好地使用本系统。");
  }

  onChange = (index, event) => {
    var t = this.state.ans;
    t[index] = event.target.value;
    this.setState({ans: t});
  }

  onChangeChck = (checkedValues) => {
    var t = this.state.ans;
    t[4] = checkedValues;
    this.setState({ans: t});
  }

  submitSurvey = () => {
    var mark = 0;
    Question.map((item, index) => {
      var t = 0;
      if (index === 4) {
        this.state.ans[index].map(id => {
          t += item.score[id];
        });
      }
      else {
        t = item.score[this.state.ans[index]];
      }
      if (index < 6) {
        mark += t * 8 / 60;
      }
      else {
        mark += t * 2 / 40;
      }
    });
    window.sessionStorage.mark = mark.toFixed(6);
    message.success("调查完成，感谢您的配合！您的指数是：" + window.sessionStorage.mark + " 。");
    const hide = message.loading("正在上传您的指数...");
    uploadMark({mark: window.sessionStorage.mark.toString()}).then(res => {
      hide();
      if (res.code === 0) {
        message.success("指数上传完成！");
        this.props.history.push("/");
      }
      else {
        message.success("指数上传失败！");
      }
    });
  }

  render() {
    return (
      <div className={styles.whole}>
        {Question.map((item, index) => {
          return (
            <div className={styles.question}>
              {(index + 1) + ". " + item.title}
              {index !== 4 ? 
              <Radio.Group onChange={this.onChange.bind(this, index)} value={this.state.ans[index]}>
                {item.choice.map((item, index) => {
                  return (
                    <Radio value={index}>{item}</Radio>
                  );
                })}
              </Radio.Group> : 
              <Checkbox.Group onChange={this.onChangeChck} value={this.state.ans[4]}>
              {item.choice.map((item, index) => {
                return (
                  <Checkbox value={index}>{item}</Checkbox>
                );
              })}
            </Checkbox.Group>}
            </div>
          );
        })}
        <Button onClick={this.submitSurvey} type="primary" style={{flex: "none", fontSize: "4vh", padding: "1vh", width: "100%", height: "20%", margin: "2vh"}}>提交</Button>
      </div>
    );
  }
}

export default WithHeader(withRouter(Survey), "问卷调查");