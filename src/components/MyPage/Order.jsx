import React, { Component } from "react";
import sty from "./Order.module.scss";
import OrderFooter from "./OrderFooter";
import { fetchAPI } from "../../ajax/fetchAPI";
import OrderEntry from "./OrderEntry";

export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    fetchAPI("http://localhost:3000/data/myPageData.json").then(res => {
      this.setState({
        data: res.data
      });
    });
  }
  render() {
    const { data } = this.state;
    return (
      <div className={sty.order}>
        {data.map((card, i) => (
          <OrderEntry card={card} />
        ))}
        <OrderFooter />
      </div>
    );
  }
}
