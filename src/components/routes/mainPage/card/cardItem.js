import React, { Component } from "react";

class CardItem extends Component {
  render() {
    return (
      <div className={`card-item-container ${this.props.className}`}>
        {" "}
        {this.props.title}{" "}
      </div>
    );
  }
}

export default CardItem;
