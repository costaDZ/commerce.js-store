import React from 'react';

import { Form, Button, Row, Container, Col } from 'react-bootstrap';
import Review from './Review';

import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

export const PaymentForm = ({ shipingData, checkoutToken, prevStep }) => {

    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

    return (
        <>
            <Container>
                <h4 className={'my-3'}>Order Summary :</h4>
                <Review checkoutToken={checkoutToken} />
                <br /> <br />

                <Elements stripe={stripePromise}>
                    <ElementsConsumer>{({ elements, stripe }) => (
                        <form >
                            <CardElement />
                            <br /> <br />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant="primary" onClick={prevStep}>Back</Button>
                                <Button type="submit" variant="success" disabled={!stripe}>
                                    Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                                </Button>
                            </div>
                        </form>
                    )}
                    </ElementsConsumer>
                </Elements>
            </Container>


        </>


        // <Form>
        //     <Form.Group controlId="formBasicEmail">
        //         <Form.Label>Email address</Form.Label>
        //         <Form.Control type="email" placeholder="Enter email" />
        //         <Form.Text className="text-muted">
        //             We'll never share your email with anyone else.
        //     </Form.Text>
        //     </Form.Group>
        //     <Form.Group controlId="formBasicPassword">
        //         <Form.Label>Password</Form.Label>
        //         <Form.Control type="password" placeholder="Password" />
        //     </Form.Group>
        //     <Button variant="primary" type="submit">Submit</Button>
        // </Form>
    )
}
