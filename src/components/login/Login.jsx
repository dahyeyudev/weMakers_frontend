import React, { Component } from "react";
import sty from "./Login.module.scss";
import LoginFooter from "../loginFooter/LoginFooter";
import LoginButton from "./LoginButton";
import LoginSet from "./LoginSet";
import LoginBelowButtons from "./LoginBelowButtons";
import LoginValidation from "./LoginValidation";
import LoginInput from "./LoginInput";
import { userAuthEndPoint } from "../../ajax/ajaxAPI";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHelpTooltipOn: false,
      email: "",
      password: "",
      isValidate: false
    };
    this.clickHelp = this.clickHelp.bind(this);
    this.closeHelpTooltip = this.closeHelpTooltip.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  clickHelp() {
    this.setState({
      isHelpTooltipOn: !this.state.isHelpTooltipOn
    });
  }

  closeHelpTooltip(e) {
    if (e.target.name !== "tooltip") {
      this.setState({
        isHelpTooltipOn: false
      });
    }
  }

  checkValidation() {
    if (
      this.state.email === "" ||
      !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(
        this.state.email
      ) ||
      this.state.password === "" ||
      !/^[a-zA-Z0-9]{8,32}$/.test(this.state.password)
    ) {
      this.setState({ isValidate: true });
    } else {
      this.setState({ isValidate: false }, () => {
        this.sendLoginData();
      });
    }
  }
  //서버 api
  sendLoginData = () => {
    fetch(userAuthEndPoint, {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(res => {
        localStorage.setItem("auth_token", res.access_token);
        window.location.href = "/";
      });
  };

  render() {
    return (
      <div className={sty.kakaoWrap} onClick={this.closeHelpTooltip}>
        <div className={sty.container}>
          <h1>
            <span className={sty.kakao}></span>
          </h1>
          <div className={sty.loginForm}>
            <fieldset className={sty.fieldset}>
              <LoginInput
                email={this.state.email}
                password={this.state.password}
                isHelpTooltipOn={this.state.isHelpTooltipOn}
                handleChange={this.handleChange}
                clickHelp={this.clickHelp}
              />
              <LoginSet />
              {this.state.isValidate && <LoginValidation />}
              <LoginButton checkValidation={this.checkValidation} />
            </fieldset>
          </div>
          <LoginBelowButtons />
        </div>
        <LoginFooter />
      </div>
    );
  }
}
export default Login;
