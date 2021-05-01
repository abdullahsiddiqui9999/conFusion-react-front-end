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
                  -- {comment.author},{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).format(new Date(Date.parse(comment.date)))}
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

    return dish ? (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 m-1">{this.renderDish(dish)}</div>

          {this.renderComments(dish.comments)}
        </div>
      </div>
    ) : (
      <div></div>
    );
  }
}

export default DishDetail;
