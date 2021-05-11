import React from "react";
import { Navbar, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../img/commerce.png";
import cart from "../../img/cart-64.png";

export const Nav = ({ total_items }) => {
  return (
    <div>
      <Navbar bg="light">
        <Col xs={9} lg={11}>
          <Link to="/">
            <Navbar.Brand>
              {" "}
              <img width={64} height={64} src={logo} alt="logo" />{" "}
            </Navbar.Brand>
            Dz Store
          </Link>
        </Col>
        <Col xs={2} lg={1}>
          <Link to="/cart">
            <img src={cart} alt="cart-logo" className="cart-logo" />
          </Link>
          {total_items ? (
            <span className={"cart-number"}>{total_items}</span>
          ) : null}
        </Col>
      </Navbar>
    </div>
  );
};
