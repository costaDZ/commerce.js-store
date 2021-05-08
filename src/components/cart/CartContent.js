import React from 'react';

import { Container, Jumbotron, Button, Col, Card, ListGroup, ListGroupItem, Row, CardDeck } from 'react-bootstrap';
import { Link } from 'react-router-dom';




export const CartContent = ({ line_items, subtotal, total_items, updateCart, removeFromCart, clearCart }) => {


    function EmptyCart() {
        return (
            <Container className={'py-5'}>
                <Jumbotron>
                    <h4>Hello, Dear!</h4>
                    <p>Your cart is empty right Now </p>
                    <Link to='/'>
                        <Button variant="primary">Return To Store</Button>
                    </Link>
                </Jumbotron>
            </Container>
        )
    }


    function CartItems() {
        console.log(line_items);
        return (
            <Container fluid className={'px-0'}>
                <CardDeck>
                    {
                        line_items.map(item =>
                            <Col xs={12} md={6} lg={6} xl={4} className={'py-2'} key={item.id}>
                                <Card className={'my-2 shadow'}>
                                    <Card.Img variant="top" src={item.media.source} className={"cart-img"} />
                                    <Card.Body>
                                        <Card.Title className={"text-uppercase title"}>{item.name}</Card.Title>
                                        <ListGroup className="list-group-flush card-text">
                                            <ListGroupItem className="px-0">Item Price : {item.price.formatted_with_code}</ListGroupItem>
                                            <ListGroupItem className="px-0">quantity :
                                            <Button variant="light" className="mx-2" onClick={() => updateCart(item.id, item.quantity + 1)}>+</Button>
                                                {item.quantity}
                                                <Button variant="light" className="mx-2" onClick={() => updateCart(item.id, item.quantity - 1)}>-</Button></ListGroupItem>
                                            <ListGroupItem className="px-0">Total Price : {item.line_total.formatted_with_code}</ListGroupItem>
                                        </ListGroup>
                                    </Card.Body>
                                    <footer >
                                        <Row>
                                            <Col className="text-center my-1"><Button className="card-text" variant="success">Buy Now</Button></Col>
                                            <Col className="text-center my-1"><Button className="card-text" variant="danger" onClick={() => removeFromCart(item.id)}>Remove</Button></Col>
                                        </Row>
                                    </footer>
                                </Card>
                            </Col>
                        )
                    }
                </CardDeck>
            </Container>
        )
    }

    if (!line_items) return <h1>Loading..</h1>


    return (
        <Container fluid>
            <h3 className={'my-2'}>Your Shopin Cart : </h3>
            {line_items ? <CartItems /> : <EmptyCart />}
            <Row className={'my-4'}>
                <Col className={'text-center'} xs={12} lg={4}>
                    <h5 className={'bg-light d-inline'}>Total Items :<small> {total_items}</small> </h5>
                </Col>
                <Col className={'text-center'} xs={12} lg={4}>
                    <h5 className={'bg-light d-inline'}>Total Price :<small>{subtotal.formatted_with_code}</small> </h5>
                </Col>

                <Col className="text-center my-1" xs={12} lg={2}>
                    <Link to={"/checkout"}>
                        <Button className="card-text" variant="info">Check Out</Button>
                    </Link>
                </Col>
                <Col className="text-center my-1" xs={12} lg={2}>
                    <Button className="card-text" variant="danger" onClick={clearCart}>Empty Cart</Button>
                </Col>
            </Row>
        </Container>
    )
}

