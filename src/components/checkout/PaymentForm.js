import React from "react";
import { Form, Button, Row, Container, Col } from "react-bootstrap";
import Review from "./Review";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

export const PaymentForm = ({
  shipingData,
  checkoutToken,
  prevStep,
  handleCaptureCheckout,
  nextStep,
}) => {
  const handelSubmit = async (e, elements, stripe) => {
    e.preventDefault();
    if (!elements || !stripe) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shipingData.first_name,
          lastname: shipingData.last_name,
          email: shipingData.email,
        },
        shipping: {
          name: "International",
          street: shipingData.address1,
          town_city: shipingData.city,
          county_state: shipingData.shippingSubdivision,
          postal_zip_code: shipingData.zip,
          country: shipingData.shippingCountry,
        },
        fulfillment: { shipping_method: shipingData.shippingOption },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      handleCaptureCheckout(checkoutToken.id, orderData);
      nextStep();
    }
  };

  return (
    <>
      <Container>
        <h4 className={"my-3"}>Order Summary :</h4>
        <Review checkoutToken={checkoutToken} />
        <br /> <br />
        <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({ elements, stripe }) => (
              <form onSubmit={(e) => handelSubmit(e, elements, stripe)}>
                <CardElement />
                <br /> <br />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button variant="primary" onClick={prevStep}>
                    Back
                  </Button>
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
  );
};
