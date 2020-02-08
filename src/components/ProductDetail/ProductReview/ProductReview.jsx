import React, { Component } from "react";
import ProductReviewElement from "./ProductReviewElement";
import { fetchAPI } from "../../../utils/fetchAPI.js";
import data from "./ProductReviewData";
import sty from "./ProductReview.module.scss";

export default class ProductReview extends Component {
  state = {
    data: data
  };
  componentDidMount() {
    // fetchAPI('http://localhost:3000/data/ProductReview.json').then(res => {
    // reviewData: data
  }

  render() {
    /* if (!this.state.data.reviewData || !this.state.data.reviewTotal)
      return <></>; */
    // console.log(this.state.reviewData);

    const { reviewData } = this.state.data;
    const {
      total,
      fourStar,
      threeStar,
      twoStar,
      oneStar
    } = this.state.data.reviewTotal;

    const myStyle1 = {
      width: Math.round((fourStar / total) * 100) + "%"
    };
    const myStyle2 = {
      width: Math.round((threeStar / total) * 100) + "%"
    };
    const myStyle3 = {
      width: Math.round((twoStar / total) * 100) + "%"
    };
    const myStyle4 = {
      width: Math.round((oneStar / total) * 100) + "%"
    };
    const satisfy = Math.round(
      ((Number(fourStar) + Number(threeStar)) / total) * 100
    );

    const list = reviewData.map((element, index) => (
      <ProductReviewElement key={index} data={element} />
    ));

    return (
      <div className={sty.productReviewBox}>
        <div className={sty.reviewInfo}>
          <div className={sty.satisfyPurchase}>
            <p className={sty.rateTxt}>
              <span className={sty.rate}>{satisfy}%</span>의 구매자가
              만족했습니다.
            </p>
          </div>
          <div className={sty.reviewGraph}>
            <dl className={sty.graphElement}>
              <dt className={sty.satisfyScoreBox}>
                <span className={`${sty.satisfyScore} ${sty.score1}`}></span>
              </dt>
              <dd>
                <span className={sty.evaluate}>매우 만족해요</span>
                <span className={sty.bgBar}>
                  <span
                    className={`${sty.innerBar} ${sty.inner1} ${sty.stretchRight}`}
                    style={myStyle1}
                  ></span>
                </span>
                <span className={sty.txtScore}>{myStyle1.width}</span>
              </dd>
            </dl>
            <dl className={sty.graphElement}>
              <dt className={sty.satisfyScoreBox}>
                <span className={`${sty.satisfyScore} ${sty.score2}`}></span>
              </dt>
              <dd>
                <span className={sty.evaluate}>만족해요</span>
                <span className={sty.bgBar}>
                  <span
                    className={`${sty.innerBar} ${sty.inner2} ${sty.stretchRight}`}
                    style={myStyle2}
                  ></span>
                </span>
                <span className={sty.txtScore}>{myStyle2.width}</span>
              </dd>
            </dl>
            <dl className={sty.graphElement}>
              <dt className={sty.satisfyScoreBox}>
                <span className={`${sty.satisfyScore} ${sty.score3}`}></span>
              </dt>
              <dd>
                <span className={sty.evaluate}>아쉬워요</span>
                <span className={sty.bgBar}>
                  <span
                    className={`${sty.innerBar} ${sty.inner3} ${sty.stretchRight}`}
                    style={myStyle3}
                  ></span>
                </span>
                <span className={sty.txtScore}>{myStyle3.width}</span>
              </dd>
            </dl>
            <dl className={sty.graphElement}>
              <dt className={sty.satisfyScoreBox}>
                <span
                  className={`${sty.satisfyScore} ${sty.score4} ${sty.stretchRight}`}
                ></span>
              </dt>
              <dd>
                <span className={sty.evaluate}>매우 아쉬워요</span>
                <span className={sty.bgBar}>
                  <span
                    className={`${sty.innerBar} ${sty.inner4}`}
                    style={myStyle4}
                  ></span>
                </span>
                <span className={sty.txtScore}>{myStyle4.width}</span>
              </dd>
            </dl>
            <div className={sty.participation}>
              {total}명 참여
              <button>
                <span className={sty.helpBtn}>
                  <span></span>
                </span>
              </button>
            </div>
          </div>
        </div>
        <a href="https://makers.kakao.com/my/review?menu=wait">
          <span className={sty.writeLink}>
            구매후기는 <span className={sty.point}>후기내역</span>에서 작성하실
            수 있습니다.
            <span className={sty.writeImg}></span>
          </span>
        </a>
        <ul className={sty.reviewList}>{list}</ul>
      </div>
    );
  }
}
