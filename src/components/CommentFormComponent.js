import React, { Component } from "react";
import {
  Button,
  Label,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

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
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
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
                    <option>1</option>
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

export default CommentForm;
