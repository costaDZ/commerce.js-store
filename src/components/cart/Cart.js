import React, { useState } from 'react'
import { Card, Button, Col } from 'react-bootstrap';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const Cart = ({ id, name, media, price, description, addToCart, cartBorder }) => {

    // const [subLoading, setSubLoading] = useState(true);

    // console.log(subLoading);

    // const Loader = () => {
    //     return (
    //         <h1>...Loading</h1>
    //     )
    // }
    // onLoad = {() => setSubLoading(false)}

    return (
        <Col xs={12} md={6} lg={6} xl={3} className={'py-2'}>
            <Card id={id} className={'shadow'} border={`${cartBorder}`} >
                <>
                    <Card.Img variant="top" src={media.source} className={"cart-img"} />
                    <Card.Body className={"px-1 cards-body"}>
                        <Col xs={6} className={"inline px-0"}>
                            <Card.Title className={"text-uppercase title"}>{name}
                            </Card.Title>
                        </Col>
                        <Col xs={6} className={"inline px-0"}>
                            <Card.Subtitle className="text-right price">{price.formatted_with_code}</Card.Subtitle>
                        </Col>
                        <Card.Text dangerouslySetInnerHTML={{ __html: description }} className={"text-secondary"}>
                        </Card.Text>
                    </Card.Body>
                    <footer className="product-price text-right">
                        <Button variant="light" className={'border-top border-left'} onClick={() => addToCart(id, 1)} >
                            <AddShoppingCartIcon />
                        </Button>
                    </footer>
                </>
            </Card>
        </Col>
    )
}

export default Cart;