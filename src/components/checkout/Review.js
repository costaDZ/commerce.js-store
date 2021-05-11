import React from 'react';

import { ListGroup } from 'react-bootstrap';

const Review = ({ checkoutToken }) => {
    return (
        <>
            <ListGroup variant="flush">
                {checkoutToken.live.line_items.map(product =>
                    <ListGroup.Item className={'py-1 bold text-uppercase'}>{product.name} <br /> <p className={"fw-bold text-lowercase text-info bg-light d-inline-block"}>Quantity : {product.quantity}</p></ListGroup.Item>
                )}
            </ListGroup>

            <ListGroup variant="flush">
                <ListGroup.Item variant="info">Total : {checkoutToken.live.subtotal.formatted_with_symbol}</ListGroup.Item>
            </ListGroup>
        </>
    )
}

export default Review
