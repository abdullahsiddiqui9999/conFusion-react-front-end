import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Label,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length > len;

class CommentForm extends Component {
  state = {};

  constructor(props) {
    super();

    this.state = {
      isAddCommentModalOpen: false,
    };
  }

  toggleAddCommentModal = () => {
    this.setState({
      isAddCommentModalOpen: !this.state.isAddCommentModalOpen,
    });
  };

  handleSubmit = (values) => {
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
  };

  render() {
    return (
      <React.Fragment>
        <Button outline onClick={this.toggleAddCommentModal} className="btn-sm">
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>
        <Modal
          isOpen={this.state.isAddCommentModalOpen}
          toggle={this.toggleAddCommentModal}
        >
          <ModalHeader toggle={this.toggleAddCommentModal}>
            Submit Comment
          </ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" className="col-12">
                  Rating
                </Label>
                <Col className="col-12">
                  <Control.select
                    model=".rating"
                    name="rating"
                    className="form-control"
                  >
                    <option selected>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author" className="col-12">
                  Your Name
                </Label>
                <Col className="col-12">
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Last Name"
                    className="form-control"
                    validators={{
                      maxLength: maxLength(15),
                      minLength: minLength(2),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      maxLength: "Must be 15 characters or less",
                      minLength: "Must be greater than 2 characters",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" className="col-12">
                  Comment
                </Label>
                <Col className="col-12">
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows="6"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col className="col-12">
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

function RenderComments({ comments, postComment, dishId }) {
  if (comments && comments.length > 0) {
    return (
      <div className="row">
        <div className="col-12 col-md ml-1">
          <h4>Comments</h4>

          <ul className="list-unstyled">
            <Stagger in>
              {comments.map((comment) => (
                <Fade in>
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
                </Fade>
              ))}
            </Stagger>
          </ul>

          <CommentForm dishId={dishId} postComment={postComment} />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

function RenderDish({ dish }) {
  return (
    <FadeTransform
      in
      transformProps={{
        exitTransform: "scale(0.5) translateY(-50%)",
      }}
    >
      <Card>
        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </FadeTransform>
  );
}

function DishDetail(props) {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments
              comments={props.comments}
              postComment={props.postComment}
              dishId={props.dish.id}
            />
          </div>
        </div>
      </div>
    );
  } else {
    <div></div>;
  }
}

export default DishDetail;
