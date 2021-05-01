import React, { Component } from "react";
import DishDetail from "./DishDetailComponent";
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";
class Menu extends Component {
  state = {};

  constructor(props) {
    super(props);
  }

  render() {
    const menu = this.props.dishes.map((dish) => (
      <div className="col-12 col-md-5 m-1" key={dish.id}>
        <Card key={dish.id} onClick={() => this.props.onClick(dish.id)}>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardImgOverlay>
            <CardTitle>{dish.name}</CardTitle>
          </CardImgOverlay>
        </Card>
      </div>
    ));

    return (
      <div className="container">
        <div className="row">{menu}</div>

        {/* Render selected dish only if this.state.selectedDish is present */}
        {this.state.selectedDish && (
          <DishDetail dish={this.state.selectedDish} />
        )}
      </div>
    );
  }
}

export default Menu;
