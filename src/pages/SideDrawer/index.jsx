//SideDrawer
import React from "react";
import { Redirect } from "react-router-dom";
import sty from "./index.module.scss";
import SideMenu from "../../components/SideMenu";
import SideProfile from "../../components/SideProfile";
import PlusFriendLayer from "../../components/HomePlusFriendLayer";
import { fetchAPI } from "../../ajax/fetchAPI";
const menuList1 = [
  "주문 배송 내역",
  "후기 내역",
  "1:1문의 내역",
  "제품 문의 내역"
];
const menuList2 = ["공지 센터", "공지 사항", "도움말 문의"];
const menuList3 = [
  "카카오 메이커스 소개",
  "브랜드 스토리",
  "브랜드 전체 보기",
  "입점 문의하기"
];

export default class SideDrawer extends React.Component {
  state = {
    nickName: "",
    userImage: "",
    point: 0,
    navigate: false
  };
  componentDidMount() {
    localStorage.getItem("auth_token") &&
      fetchAPI("http://localhost:3000/data/profileData.json").then(res => {
        this.setState({
          nickName: res.nickname,
          userImage: res.user_image,
          point: res.point
        });
      });
  }
  logOut = () => {
    localStorage.clear("auth_token");
    window.location.href = "/";
  };
  render() {
    const { nickName, userImage, point, navigate } = this.state;
    const { show, switchToggle } = this.props;
    return (
      <>
        {navigate && <Redirect to="/" push={true} />}
        <section className={`${sty.sideDrawer} ${show && sty.open}`}>
          <div className={sty.sideWrapper}>
            <SideProfile
              nickName={nickName}
              userImage={userImage}
              point={point}
            />
            <SideMenu menuList={menuList1} />
            <SideMenu menuList={menuList2} />
            <SideMenu menuList={menuList3} />

            <div className={sty.downApp}>
              <p className={sty.downAppTitle}>메이커스앱 다운로드</p>
            </div>
            {nickName && (
              <div className={sty.logOut} onClick={this.logOut}>
                <p className={sty.logOutTitle}>로그아웃</p>
              </div>
            )}
          </div>
        </section>
        {show && (
          <div className={sty.sideBackDrop} onClick={switchToggle}></div>
        )}
      </>
    );
  }
}
