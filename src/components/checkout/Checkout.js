import React, { useState, useEffect } from 'react';

import { Jumbotron, Badge, Row, Container } from 'react-bootstrap';

import { PaymentForm } from './PaymentForm';
import { AddressForm } from './AddressForm';

import { commerce } from '../lib/Commerce';


export const Checkout = ({ cart }) => {
    const [checkoutToken, setCheckoutToken] = useState({});
    const [activeStep, setActiverStep] = useState(0);
    const [shipingData, setShipingData] = useState({});

    let Confirmation = () => {
        return (
            <div>
                Confirmation ...
            </div>
        )
    }

    useEffect(() => {
        if (cart.id) {
            const generateToken = async () => {
                try {
                    const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
                    setCheckoutToken(token);
                } catch {
                }
            };

            generateToken();
        }
    }, [cart]);

    const nextStep = () => setActiverStep((prevActiveStep) => prevActiveStep + 1);
    const prevStep = () => setActiverStep((prevActiveStep) => prevActiveStep - 1);

    console.log(checkoutToken);

    const next = (data) => {
        nextStep();
        setShipingData(data);
    }

    const Form = () => activeStep === 0 ?
        <AddressForm checkoutToken={checkoutToken} next={next} />
        : <PaymentForm shipingData={shipingData} checkoutToken={checkoutToken} prevStep={prevStep} />;


    return (
        <Container fluid className={'my-4 '}>
            <Jumbotron className={'bg-white shadow mx-auto text-sm-center  text-md-left'}>
                <Row className={'justify-content-center'}>
                    <Badge pill className={'mx-1'} variant={activeStep > 0 ? "success" : "primary"}>
                        &#10003;
            </Badge>{' '}
                    <div className={"line"}> shiping Address ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Payment Details </div>
                    <Badge pill className={'mx-1'} variant={activeStep === 2 ? "success" : "secondary"}>
                        &#10003;
            </Badge>{' '}
                </Row>
                <Row className={"Address-form"}>
                    {activeStep === 2 ? <Confirmation /> : checkoutToken && <Form />}
                </Row>
            </Jumbotron>
        </Container>

    )
}



//green &#10004;