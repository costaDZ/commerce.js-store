import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Badge,
  Row,
  Container,
  Alert,
  Button,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { PaymentForm } from "./PaymentForm";
import { AddressForm } from "./AddressForm";
import { commerce } from "../lib/Commerce";

export const Checkout = ({ cart, order, handleCaptureCheckout, error }) => {
  const [checkoutToken, setCheckoutToken] = useState({});
  const [activeStep, setActiverStep] = useState(0);
  const [shipingData, setShipingData] = useState({});

  let Confirmation = () =>
    //order.customer?
    error ? (
      <Container className={"text-center"}>
        <div>
          <Alert variant="success" className={"my-4 text-center"}>
            Thank you for your purchase
          </Alert>
          {/* {order.customer.firstname} {order.customer.lastname}! */}
          {/* <Alert variant="info">Order ref: {order.customer_reference}</Alert> */}
        </div>
        <br />
        <Link to={"/"}>
          <Button variant="primary" type="button">
            Back to home
          </Button>
        </Link>
      </Container>
    ) : (
      <Spinner
        animation="border"
        variant="primary"
        className={"my-4 mx-auto"}
      />
    );

  //   if (error) {
  //     Confirmation = () => (
  //       <Container>
  //         <Alert variant="danger" className={"my-4"}>
  //           Error: {error}
  //         </Alert>
  //         <br />
  //         <Link to={"/"}>
  //           <Button variant="primary" type="button" to="/">
  //             Back to home
  //           </Button>
  //         </Link>
  //       </Container>
  //     );
  //   }

  useEffect(() => {
    if (cart.id) {
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, {
            type: "cart",
          });
          setCheckoutToken(token);
        } catch { }
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
  };

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shipingData={shipingData}
        checkoutToken={checkoutToken}
        prevStep={prevStep}
        handleCaptureCheckout={handleCaptureCheckout}
        nextStep={nextStep}
      />
    );

  return (
    <Container fluid className={"my-4"}>
      <Jumbotron
        className={"bg-white shadow mx-auto text-sm-center  text-md-left py-2"}
      >
        <Row className={"justify-content-center"}>
          <Badge
            pill
            className={"mx-1"}
            variant={activeStep > 0 ? "success" : "primary"}
          >
            &#10003;
          </Badge>
          <div className={"line text-center"}>
            <span className={"d-block d-md-inline min-vw-100"}>
              shiping Address
            </span>
            <span className={"d-none d-md-inline"}>⎯⎯⎯⎯⎯⎯</span>{" "}
            <span className={"d-block d-md-inline min-vw-100"}>
              Payment Details
            </span>
          </div>
          <Badge
            pill
            className={"mx-1"}
            variant={activeStep === 2 ? "success" : "secondary"}
          >
            &#10003;
          </Badge>
        </Row>
        <Row className={"Address-form"}>
          {activeStep === 2 ? <Confirmation /> : checkoutToken && <Form />}
        </Row>
      </Jumbotron>
    </Container>
  );
};
