import React, { Component } from "react";
import styles from "./index.module.less";
import { withRouter } from "react-router-dom";
import IosCreate from "react-ionicons/lib/IosCreate";
import MdCreate from "react-ionicons/lib/MdCreate";
import { message, Drawer, Comment, Avatar, Button, Input } from "antd";

import WithHeader from "../../component/WithHeader";

const Posts = [
  {
    "title": "康美药业财务造假主要包括：存货少计195.46亿元、货币资金多计299.44亿元",
    "time": " 2019/09/15 12:57:21",
    "content": " 康美药业财务造假主要包括：存货少计195.46亿元、货币资金多计299.44亿元、营业收入多计88.98亿元、营业成本多计76.62亿元等，各项造假总和660.5亿元。660亿绝对是个天文数字，康美药业财务造假真的是造到天上了。接下来绝不单单是退市问题，而是如何接受经济处罚和司法制裁、接受数十万投资者因公司财务造假而造成投资损失的集体追偿以及如何破产清算了 ",
    "comment": [
      {
        "name": "刘钦",
        "time": "2019/09/15 12:57:49",
        "content": "知道财务造假这个消息后买入这个股票应该是不会赔偿的，明知故买自己承担责任"
      },
      {
        "name": "王浩然",
        "time": "2019/09/15 12:58:11",
        "content": "关键一看就是问题股，看看财务费用，10几个亿，借款要几百亿了。。。。也是醉了，去看看茅台哥的。就没这么高。"
      },
      {
        "name": "任烔玮",
        "time": "2019/09/15 12:58:41",
        "content": "蓝筹股会从几十块下跌到2,3块的？有时候有些人根本不认识股票是种悲剧，不会识别股票基本面也是种悲剧，看看它的财务报表就懂了。喜欢支持你买入，我们这边邻居买了2万多股，亏损15万。10多的成本。看股票就能知道问题股还是好股票了"
      },
    ]
  },
  {
    "title": "康美药业财务造假涉案多人遭监管处罚及禁入，被定性为“有预谋、有组织”“有预谋、有组织，长期、系统实施财务造假行为",
    "time": " 2019/09/15 13:00:01",
    "content": "8月16日下午，证监会对康美药业涉嫌财务造假案件进行了定性，并对康美药业等当事人作出处罚及禁入告知",
    "comment": []
  },
  {
    "title": "证监会发布2017年6大虚假信披典型案例",
    "time": "2019/09/15 13:37:35",
    "content": `（一）鲜言操控上市公司炮制“1001项奇葩议案”暨操纵多伦股份等系列案件
广西慧球科技股份有限公司（简称慧球科技）1001项“奇葩议案”通过网络非正常披露，将多个重大政治问题当作炒作噱头。经查，慧球科技实际控制人鲜言指使董秘炮制并通过非法渠道散播含有虚假记载、误导性陈述及重大遗漏的信息。同时查明，鲜言存在操纵“多伦股份”股票价格、指使匹凸匹披露违规、背信损害上市公司利益等多项违法犯罪行为。
证监会最终对鲜言操纵行为依法开出34.69亿元罚单并采取终身证券市场禁入措施，将其涉嫌犯罪行为移送公安机关，并对多名责任人员作出行政处罚。
（二）九好集团财务造假及相关中介机构未勤勉尽责案
浙江九好办公服务集团有限公司（简称九好集团）为了重组上市，与上市公司鞍重股份联手进行“忽悠式”重组，通过各种手段虚增巨额收入和银行存款。
审计机构利安达会计师事务所、法律服务机构天元律师事务所、评估机构中联资产评估集团有限公司、独立财务顾问西南证券及其从业人员未勤勉尽责，出具专业意见存在虚假记载。
2017年4月，证监会依法查处了包括鞍重股份、九好集团、九好集团股东、九好集团实际控制人的一致行动人在内的33名责任主体。对组织、决策实施财务造假的九好集团实际控制人郭丛军等人采取证券市场禁入措施，对4家中介机构分别给予顶格处罚。
三）东墨龙虚假陈述及实际控制人精准减持案
山东墨龙石油机械股份有限公司（简称山东墨龙）公告三季度盈利800余万元并预计全年盈利。2017年2月修正称，预计2016年全年亏损4.8亿至6.3亿元，业绩“变脸”引发市场质疑。调查发现，2015年以来，山东墨龙通过虚增售价、少计成本等手法连续两年将季报、半年报“扭亏为盈”，虚增收入最高达1亿元，虚增利润最高达2.2亿元。在业绩“变脸”的内幕信息发布前，公司实际控制人、董事长张恩荣及其子总经理张云山以大宗交易方式抛售股票，避损3824万元，“吃相”难看。2017年9月，证监会依法对山东墨龙和张恩龙父子内幕交易行为作出行政处罚。
（四）雅百特财务造假案——2017年跨境执法合作的成功案例
江苏雅百特科技股份有限公司（简称雅百特）重组上市过程中，于2015年1月披露承接巴基斯坦木尔坦地铁公交工程的金属屋面围护系统工程，合同金额3250万美元。重组上市后，2015年报披露工程完工，实现收入2亿元。经查，雅百特通过虚构承揽境外项目、虚构跨境资金循环、虚构建材出口、虚构境内建材贸易等手法，虚增收入5.8亿元，虚增利润2.6亿元。2017年12月，证监会对雅百特做出顶格罚款，对相关责任人员依法采取证券市场禁入措施。
（五）佳电股份财务造假案
上市公司阿继电器进行资产重组，重组完成后更名为佳电股份，佳木斯电机股份有限公司（简称佳电公司）由此成为上市公司全资子公司。重组协议约定，佳电公司在2011至2014年度实际净利润应不低于预测水平，否则佳电公司原股东需向阿继电器原股东进行补偿。经查，为保证业绩承诺完成，佳电股份以少计主营业务成本、销售费用等方式，在2013年、2014年合计虚增利润1.98亿元。本案听证期间，多名高管以“对公司造假行为不知情，对隐蔽的财务手段无法、无能力识别”为由提起申辩。2017年12月，证监会依法对佳电股份及其22名相关责任人员依法作出行政处罚。
（六）晨龙锯床违规披露案
浙江晨龙锯床股份有限公司（简称晨龙锯床）的关联方浙江晨龙集团有限公司、浙江合一机械有限公司通过111笔关联资金交易，累计占用晨龙锯床资金1.2亿元，晨龙锯床未按规定履行审议程序，未及时、准确、完整地披露。2017年3月，浙江证监局依法对晨龙锯床及其实际控制人、财务总监作出行政处罚。`,
    "comment": []
  },
  {
    "title": "存货周转率上升，应收账款周转率上升，但是流动资产周转率下降",
    "time": " 2019/09/15 13:39:40",
    "content": "",
    "comment": [
      {
        "name": "黄蕾",
        "time": "2019/09/15 13:39:58",
        "content": `首先，流动资产周转率计算公式 = 营业收入 / 平均流动资产
1、从分母上讲，流动资产包含因素很多啊， 如货币资金，交易性金融资产，这些流动性更强，称之为速动资产，若速动资产 在 流动资产中的占比过高， 而应收款项和存货的占比较小 ，那么对应其周转率对整体流动资产周转率的影响就较小；
2、从分子上讲 分母一定，分子减少 ，那么周转率就下降， 若公司本期业绩不好，，没有新的收入来源，结转的成本也变少，年末应收和存货较年初也下降很多，因此导致应收账款周转率和存货周转率上升；
个人想法，不喜勿喷，如有错误之处还请指教。`
      },
    ]
  },
];

class Forum extends Component {
  constructor(props) {
    super(props);
    this.state = {visible: false, index: 0};
  }

  forbidden = () => {
    message.error("您当前所在用户组没有该权限！");
  }

  showPost = (index) => {
    this.setState({visible: true, index: index});
  }

  hidePost = () => {
    this.setState({visible: false, index: 0});
  }

  render() {
    const post = Posts[this.state.index];
    const detail = {
      main: {
        display: "flex",
        width: "100%",
        flexFlow: "column nowrap",
        justifyContent: "flex-start",
        color: "rgb(89, 77, 73)",
        wordWrap: "break-word",
        wordBreak: "keep-all",
        padding: "3vh 5vh"
      },
      title: {
        fontSize: "4.5vh",
        marginBottom: "2vh"
      },
      time: {
        fontSize: "2.5vh",
        marginBottom: "4vh"
      },
      content: {
        fontSize: "2.5vh",
        marginBottom: "10vh"
      },
      head: {
        fontSize: "3.5vh",
        marginBottom: "3vh"
      },
      comment: {
        name: {
          fontSize: "3vh",
          fontWeight: "bold"
        },
        time: {
          fontSize: "2vh",
        },
        content: {
          fontSize: "2.5vh",
        }
      },
      submit: {
        fontSize: "2.5vh",
        height: "8vh",
        marginTop: "5vh",
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "center",
        alignItems: "center"
      },
      icon: {
        marginRight: "1vh"
      },
      input: {
        marginTop: "2vh",
        fontSize: "2.5vh"
      }
    };
    return (
      <div className={styles.whole}>
        <div className={`${styles.post} ${styles.new}`} onClick={this.forbidden}>
          <IosCreate fontSize="5vh" color="rgb(89, 77, 73)" style={{marginRight: "1vh"}}/>
          发布新帖子
        </div>
        {Posts.map((item, index) => {
          return (
            <div className={styles.post} onClick={this.showPost.bind(this, index)}>
              <div className={styles.title}>
                {item.title}
              </div>
              <div className={styles.time}>
                发布时间：{item.time}
              </div>
            </div>
          );
        })}
        <Drawer
          placement="right"
          closable={true}
          onClose={this.hidePost}
          visible={this.state.visible}
          width={"75%"}>
          <div style={detail.main}>
            <div style={detail.title}>
              {post.title}
            </div>
            <div style={detail.time}>
              发布时间：{post.time}
            </div>
            <div style={detail.content}>
              {post.content}
            </div>
            <div style={detail.head}>
              评论区
            </div>
            {post.comment.length === 0 ? <div style={detail.comment.content}>暂时没有评论</div> :
              post.comment.map((item, index) => {
              return (
                <Comment author={<div style={detail.comment.name}>{item.name}</div>} avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt={item.name} size={64}/>}
                  content={<div style={detail.comment.content}>{item.content}</div>} datetime={<div style={detail.comment.time}>{item.time}</div>}/>
              );
            })}
            <Button style={detail.submit} type="primary" onClick={this.forbidden}><MdCreate style={detail.icon} fontSize="3vh" color="white"/>发表新回复</Button>
            <Input.TextArea style={detail.input} rows={8}/>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default WithHeader(withRouter(Forum), "用户论坛");