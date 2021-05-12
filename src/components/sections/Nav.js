import React, { useState, useEffect } from "react";
import { Navbar, Col, Form, FormControl, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../img/commerce.png";
import cart from "../../img/cart-64.png";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
export const Nav = ({ total_items, searchFilter, cartBorder }) => {
  const [search, setSearch] = useState('');


  useEffect(() => {
    searchFilter(search);
  }, [search]);

  return (
    <div>
      <Navbar bg="dark">
        <Col xs={3} md={4} lg={3} className={'pl-0'}>
          <Link to="/">
            <Navbar.Brand>
              <img width={64} height={64} src={logo} alt="logo" />
            </Navbar.Brand>
            <span className={'d-none d-md-inline-block text-white fw-bold'}>Dz Store</span>
          </Link>
        </Col>
        <Col>
          <Form inline xs={2} lg={5}>
            <FormControl type="search"
              className={`btn-outline-${cartBorder} fw-bold`}
              placeholder="search                   &#128269;"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Col>
        <Col xs={2} lg={1} className={`px-0`}>
          <Link to="/cart">
            {/* <img src={cart} alt="cart-logo" className="cart-logo" /> */}
            <ShoppingCartIcon style={{ color: 'white', fontSize: '2.3em' }} className={'cart-icon'} />
          </Link>
          {total_items ? (
            <span className={"cart-number"}>{total_items}</span>
          ) : null}
        </Col>
      </Navbar>
    </div >
  );
};
