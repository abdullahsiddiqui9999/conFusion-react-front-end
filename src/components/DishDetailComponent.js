import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";

class DishDetail extends Component {
  state = {};

  constructor(props) {
    super(props);
  }

  formattedDate(date) {
    if (!(date instanceof Date)) date = new Date(date);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return `${
      monthNames[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  }

  renderComments(comments) {
    if (comments && comments.length > 0) {
      return (
        <div className="col-12 col-md ml-1">
          <h4>Comments</h4>

          <ul className="list-unstyled">
            {comments.map((comment) => (
              <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>
                  -- {comment.author}, {this.formattedDate(comment.date)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  renderDish(dish) {
    return (
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  }

  render() {
    const { dish } = this.props;

    return (
      <div className="row">
        <div className="col-12 col-md-5 m-1">{this.renderDish(dish)}</div>

        {this.renderComments(dish.comments)}
      </div>
    );
  }
}

export default DishDetail;
