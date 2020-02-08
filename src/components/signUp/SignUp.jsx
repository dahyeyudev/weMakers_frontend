import React, { Component } from "react";
//import ReactTooltip from 'react-tooltip';
import sty from "./SignUp.module.scss";
//import LoginFooter from '../loginFooter/LoginFooter';
import { userEndPoint } from "../../ajax/ajaxAPI";
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
        password: "",
        passwordAgain: "",
        nickname: ""
      },
      errorMsg: {
        email: "",
        password: "",
        nickname: ""
      }
    };
    this.changeData = this.changeData.bind(this);
    this.removeInput = this.removeInput.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.postSignup = this.postSignup.bind(this);
  }

  changeData(type, e) {
    this.setState({
      data: {
        email: this.state.data.email,
        password: this.state.data.password,
        passwordAgain: this.state.data.passwordAgain,
        nickname: this.state.data.nickname,
        [type]: e.target.value
      }
    });
  }

  removeInput(type, e) {
    this.setState({
      data: {
        ...this.state.data,
        [type]: ""
      }
    });
  }

  checkValidation() {
    // email 체크하고 password, nickname순으로 실행됨.
    if (this.state.data.email === "") {
      this.setState({
        errorMsg: {
          ...this.state.errorMsg,
          email: "이메일을 입력해주세요."
        }
      });
      return false;
    } else if (
      !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(
        this.state.data.email
      )
    ) {
      this.setState({
        errorMsg: {
          ...this.state.errorMsg,
          email: "이메일이 올바르지 않습니다."
        }
      });
      return false;
    } else {
      this.setState(
        {
          errorMsg: {
            ...this.state.errorMsg,
            email: ""
          }
        },
        () => {
          if (this.state.data.password === "") {
            this.setState({
              errorMsg: {
                ...this.state.errorMsg,
                password: "비밀번호를 입력해주세요."
              }
            });
            return false;
          } else if (!/^[a-zA-Z0-9]{8,32}$/.test(this.state.data.password)) {
            this.setState({
              errorMsg: {
                ...this.state.errorMsg,
                password: "영문 숫자 조합 8~32자리 이내로 입력해주세요."
              }
            });
            return false;
          } else if (
            this.state.data.password !== this.state.data.passwordAgain
          ) {
            this.setState({
              errorMsg: {
                ...this.state.errorMsg,
                password: "비밀번호를 동일하게 입력해주세요."
              }
            });
            return false;
          } else {
            this.setState(
              {
                errorMsg: {
                  ...this.state.errorMsg,
                  password: ""
                }
              },
              () => {
                if (this.state.data.nickname === "") {
                  this.setState({
                    errorMsg: {
                      ...this.state.errorMsg,
                      nickname: "닉네임을 입력해주세요."
                    }
                  });
                  return false;
                } else {
                  this.setState(
                    {
                      errorMsg: {
                        ...this.state.errorMsg,
                        nickname: ""
                      }
                    },
                    this.postSignup
                  );
                }
              }
            );
          }
        }
      );
    }
  }

  postSignup() {
    console.log("signup하고있음");
    // 전부통과시 서버로 전송할 데이터 (fetch)
    fetch(userEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.data.email,
        password: this.state.data.password,
        nickname: this.state.data.nickname
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log("가입성공 데이터", res);
      });
    alert("가입에 성공하셨습니다:)");
    window.location.href = "/";
  }
  render() {
    return (
      <>
        <div className={sty.container}>
          <div className={sty.kakao}></div>
          <div className={sty.kakaoWrap}>
            <div className={sty.kakaoContent}>
              <div className={sty.info}>카카오계정 정보를 입력해주세요</div>
              <fieldset className={sty.emailFieldset}>
                <div className={`${sty.emailHeader} ${sty.header}`}>
                  <p>카카오계정 이메일</p>
                </div>
                <div className={sty.emailInputWrap}>
                  <label className={sty.labelEmail}>
                    <input
                      className={`${sty.emailInput} ${sty.inputs}`}
                      type="text"
                      name="email"
                      placeholder="이메일 주소 입력"
                      value={this.state.data.email}
                      onChange={e => this.changeData("email", e)}
                    />
                    <button
                      className={sty.emailButton}
                      type="button"
                      onClick={e => this.removeInput("email", e)}
                    ></button>
                  </label>
                </div>
                {this.state.errorMsg.email !== "" && (
                  <div className={sty.validationBox}>
                    <p className={sty.validationPBox}>
                      {this.state.errorMsg.email}
                    </p>
                  </div>
                )}
              </fieldset>
              <fieldset className={sty.passwordFieldset}>
                <div className={`${sty.passwordHeader} ${sty.header}`}>
                  <p>비밀번호</p>
                  <div className={sty.passwordInputWrap}>
                    <label>
                      <input
                        className={`${sty.passwordInput} ${sty.inputs}`}
                        type="password"
                        name="password"
                        placeholder="비밀번호(8~32자리 조합)"
                        value={this.state.data.password}
                        onChange={e => this.changeData("password", e)}
                      />
                      <button
                        className={sty.emailButton}
                        type="button"
                        onClick={e => this.removeInput("password", e)}
                      ></button>
                    </label>
                  </div>
                  <div className={sty.passwordAgainInputWrap}>
                    <label>
                      <input
                        className={`${sty.passwordAgainInput} ${sty.inputs}`}
                        type="password"
                        name="passwordAgain"
                        placeholder="비밀번호 재입력"
                        value={this.state.data.passwordAgain}
                        onChange={e => this.changeData("passwordAgain", e)}
                      />
                      <button
                        className={sty.emailButton}
                        type="button"
                        onClick={e => this.removeInput("passwordAgain", e)}
                      ></button>
                    </label>
                  </div>
                  {this.state.errorMsg.password !== "" && (
                    <div className={sty.validationBox}>
                      <p className={sty.validationPBox}>
                        {this.state.errorMsg.password}
                      </p>
                    </div>
                  )}
                </div>
                <div className={`${sty.nicknameHeader} ${sty.header}`}>
                  <p>닉네임</p>
                </div>
                <div className={sty.nicknameInputWrap}>
                  <label>
                    <input
                      className={`${sty.nicknameInput} ${sty.inputs}`}
                      type="text"
                      name="nickname"
                      placeholder="닉네임을 입력해주세요"
                      value={this.state.data.nickname}
                      onChange={e => this.changeData("nickname", e)}
                    />
                    <button
                      className={sty.emailButton}
                      type="button"
                      onClick={e => this.removeInput("nickname", e)}
                    ></button>
                  </label>
                </div>
                {this.state.errorMsg.nickname !== "" && (
                  <div className={sty.validationBox}>
                    <p className={sty.validationPBox}>
                      {this.state.errorMsg.nickname}
                    </p>
                  </div>
                )}
              </fieldset>
              <div className={sty.nextButtonDiv}>
                <button
                  className={sty.nextButton}
                  onClick={this.checkValidation}
                >
                  완료
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <LoginFooter /> */}
      </>
    );
  }
}
