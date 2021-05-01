import logo from "./logo.svg";
import { Navbar, NavbarBrand } from "reactstrap";
import React, { Component } from "react";
import Menu from "./components/MainComponent";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>

        <Menu />
      </React.Fragment>
    );
  }
}

export default App;
