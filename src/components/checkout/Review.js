import React from 'react';

import { ListGroup, Badge, Row, Col } from 'react-bootstrap';

const Review = ({ checkoutToken }) => {
    return (
        <>
            <ListGroup variant="flush">
                {checkoutToken.live.line_items.map(product =>
                    <ListGroup.Item className={'py-1'}>{product.name}  <p style={{ color: "grey" }}>Quantity : {product.quantity}</p></ListGroup.Item>
                )}
            </ListGroup>

            <ListGroup variant="flush">
                <ListGroup.Item variant="info">Total : {checkoutToken.live.subtotal.formatted_with_symbol}</ListGroup.Item>
            </ListGroup>
        </>
    )
}

export default Review
