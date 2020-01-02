import React, { Component } from "react";
import sty from "./Header.module.scss";
export default class Header extends Component {
  render() {
    return (
      <header className={sty.productHead}>
        <div className={sty.titleContainer}>
          <h2 className={sty.titleBox}>
            <span className={sty.headerTitle}>제품 정보</span>
          </h2>
        </div>
        <div className={sty.toolContainer}>
          <div className={sty.leftToolBox}>
            <a
              href='https://makers.kakao.com/#NOJ1293073'
              className={sty.backBtn}
            >
              <span className={sty.backImg}></span>
            </a>
            <a href='https://makers.kakao.com/' className={sty.homeBtn}>
              <span className={sty.homeImg}></span>
            </a>
          </div>
          <div className={sty.rightToolBox}>
            <a href='https://makers.kakao.com/search' className={sty.searchBtn}>
              <span className={sty.searchImg}></span>
            </a>
          </div>
        </div>
      </header>
    );
  }
}
