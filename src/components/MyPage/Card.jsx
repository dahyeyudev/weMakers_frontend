import React, { Component } from "react";
import "../MyPage/Card.module.scss";
import CardEntry from "./CardEntry";
import { fetchAPI } from "../../ajax/fetchAPI";

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    fetchAPI("http://localhost:3000/data/myPageData.json").then(res => {
      console.log("res :", res);
      console.log("resData :", res.data);
      this.setState({
        data: res.data
      });
    });
  }
  render() {
    const { data } = this.state;
    return data.map((card, i) => (
      <CardEntry card={card} handleIsLike={this.handleIsLike} />
    ));
  }
}
