import React, { Component } from "react";
import sty from "./index.module.scss";
import HomeTag from "../../components/HomeTag";
import ProdCard1 from "../../components/HomeProdCard1";
import ProdCard2 from "../../components/HomeProdCard2";
import FadeLoader from "../../atoms/FadeLoader.jsx";
import { fetchAPI } from "../../ajax/fetchAPI";
import { productEndPoint } from "../../ajax/ajaxAPI";
const mdSelectList = ["베스트", "연말선물", "살림고수템"];

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plusFriend: false,
      goods: [],
      steadySeller: {},
      present: {},
      household: {},
      orderClosed: {}
    };
  }
  componentDidMount() {
    // fetchAPI("http://localhost:3000/data/goodsData.json").then(res => {
    fetchAPI(productEndPoint).then(res => {
      console.log("res :", res);
      this.setState({
        goods: res.goods,
        present: res.present,
        steadySeller: res.steadySeller,
        household: res.household,
        orderClosed: res.orderClosed
      });
    });
  }

  render() {
    const allArray = [
      ...this.state.goods,
      ...new Array(mdSelectList.length - 1).fill(0)
    ];
    const { steadySeller, present, household, orderClosed } = this.state;
    const goodsList = allArray.map(
      ({ id, title, desc, orders, like, likeCount, date, image }, index) => {
        if (index === allArray.length - 1)
          return (
            <ProdCard2
              key={"key1"}
              mdTitle={"1만 이상 고객이 선택한 스테디셀러"}
              mdList={steadySeller}
              marginTopVal={32}
              scrollToTag={mdSelectList[0]}
            />
          );
        if (index === allArray.length - 6)
          return (
            <ProdCard2
              key={"key3"}
              mdTitle={"따뜻한 연말 다같이 선물 나눠요"}
              mdList={present}
              marginTopVal={32}
              scrollToTag={mdSelectList[1]}
            />
          );
        if (index === allArray.length - 2)
          return (
            <ProdCard2
              key={"key2"}
              mdTitle={"주부들이 선택한 주방용품"}
              mdList={household}
              marginTopVal={32}
              scrollToTag={mdSelectList[2]}
            />
          );
        if (index === allArray.length - 2)
          return (
            <ProdCard2
              key={orderClosed.mdTitle}
              mdList={orderClosed}
              reBuyNoti={true}
              marginTopVal={56}
              textRef={this.textRef}
            />
          );
        return (
          <ProdCard1
            key={id}
            id={id}
            title={title}
            desc={desc}
            orders={orders}
            like={like}
            likeCount={likeCount}
            date={date}
            image={image}
          />
        );
      }
    );

    return (
      <>
        <section className={sty.homeWrapper}>
          <HomeTag mdSelectList={mdSelectList} />
          {this.state.goods[0] ? goodsList : <FadeLoader />}
        </section>
      </>
    );
  }
}
