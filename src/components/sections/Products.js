import React from 'react';
import { Container, CardDeck } from 'react-bootstrap';
import Cart from '../cart/Cart'


export const Products = ({ products, addToCart, cartBorder }) => {


    return (
        <Container fluid className={"my-4"}>
            <CardDeck>
                {
                    products?.map(item => <Cart key={item.id} {...item} addToCart={addToCart} cartBorder={cartBorder} />)
                }
            </CardDeck>
        </Container>
    )

}


