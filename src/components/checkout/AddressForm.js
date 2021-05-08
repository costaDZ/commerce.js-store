import React, { useState, useEffect } from 'react';

import { Form, Button, Row, Col, Container } from 'react-bootstrap';

import FormInput from './FormProvider';

import { commerce } from '../lib/Commerce'


export const AddressForm = ({ checkoutToken }) => {

    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    const contries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, name: name }));
    const subDevition = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, name: name }));

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    };

    const fetchSubDevition = async (contryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(contryCode);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    }

    const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });
        setShippingOptions(options);
        setShippingOption(options[0].id);
    };

    useEffect(() => {
        if (checkoutToken.id) fetchShippingCountries(checkoutToken.id);
    }, []);

    useEffect(() => {
        if (shippingCountry) fetchSubDevition(shippingCountry);
    }, [shippingCountry]);

    useEffect(() => {
        console.log(shippingOptions);
        if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    }, [shippingSubdivision]);

    return (
        <>
            <Col xs={12} className={"my-4"}>
                <h4>Shiping Adress :</h4>
            </Col>
            <Col>
                <Form  >
                    <Form.Row className={"justify-content-center"}>
                        <Col xs={12} md={6} xl={5}>
                            <FormInput required name="FirstName" type="name" holder={"FirstName"} />
                        </Col>
                        <Col xs={12} md={6} xl={5}>
                            <FormInput required name="LastName" type="text" holder={"LastName"} />
                        </Col>
                    </Form.Row>

                    <Form.Row className={"justify-content-center"}>
                        <Col xs={12} md={6} xl={5}>
                            <FormInput required name="Email" type="email" holder={"Email"} />
                        </Col>

                        <Col xs={12} md={6} xl={5}>
                            <FormInput required name="Address" type="address" holder={"Address"} />
                        </Col>
                    </Form.Row>

                    <Form.Row className={"justify-content-center"}>
                        <Col xs={12} md={6} xl={5}>
                            <FormInput required name="City" type="City" holder={"City"} />
                        </Col>

                        <Col xs={12} md={6} xl={5}>
                            <FormInput required name="Zip Code" type="zip" holder={"Zip Code"} />
                        </Col>
                    </Form.Row>

                    <Form.Row className={"justify-content-center"}>
                        <Col xs={12} md={6} xl={5}>
                            <Form.Label>Shiping Contry</Form.Label>
                            <Form.Control as="select"
                                defaultValue={shippingCountry}
                                onChange={(e) => setShippingCountry(e.target.value)}
                            >
                                {contries.map(contry => <option key={contry.id} value={contry.id}>{contry.name}</option>)}
                            </Form.Control>
                        </Col>

                        <Col xs={12} md={6} xl={5}>
                            {
                                shippingCountry &&
                                <>
                                    <Form.Label>States</Form.Label>
                                    <Form.Control as="select"
                                        defaultValue={shippingSubdivision}
                                        onChange={(e) => setShippingSubdivision(e.target.value)}
                                    >
                                        {subDevition.map(devition => <option key={devition.id} value={devition.id}>{devition.name}</option>)}
                                    </Form.Control>
                                </>

                            }

                        </Col>
                    </Form.Row>


                    <Form.Row className={"justify-content-center"}>
                        <Button variant="success" type="submit" className={'my-3'}>
                            Submit
                    </Button>
                    </Form.Row>
                </Form>
            </Col>
        </>
    )
}


{/* <FormInput required name="firstName" type="First name" />
            <FormInput required name="lastName" type="Last name" />
            <FormInput required name="address1" type="Address line 1" />
            <FormInput required name="email" type="Email" />
            <FormInput required name="city" type="City" />
            <FormInput required name="zip" type="Zip / Postal code" />
   */}
