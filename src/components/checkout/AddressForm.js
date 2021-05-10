import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { commerce } from '../lib/Commerce'


export const AddressForm = ({ checkoutToken, next }) => {

    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    const [formInfo, setFormInfo] = useState({});

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
        if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    }, [shippingSubdivision]);


    const handelSubmit = (e) => {
        e.preventDefault();
        next(formInfo);
    }

    const handelSelect = (e, target, info) => {
        target(e.target.value);
        setFormInfo({ ...formInfo, [info]: e.target.value })
    }

    return (
        <>
            <Col xs={12} className={"my-4"}>
                <h4>Shiping Adress :</h4>
            </Col>
            <Col>
                <Form onSubmit={(e) => handelSubmit(e)}>
                    <Form.Row className={"justify-content-center"}>
                        <Col xs={12} md={6} xl={5}>
                            <Form.Label>First name</Form.Label>
                            <Form.Control name="firstName" label="First name" value={formInfo.first_name} onChange={(e) => setFormInfo({ ...formInfo, first_name: e.target.value })} />
                        </Col>
                        <Col xs={12} md={6} xl={5}>
                            <Form.Label>Last name</Form.Label>
                            <Form.Control required name="lastName" label="Last name" value={formInfo.last_name} onChange={(e) => setFormInfo({ ...formInfo, last_name: e.target.value })} />
                        </Col>
                    </Form.Row>

                    <Form.Row className={"justify-content-center"}>
                        <Col xs={12} md={6} xl={5}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control required name="email" label="Email" value={formInfo.email} onChange={(e) => setFormInfo({ ...formInfo, email: e.target.value })} />
                        </Col>

                        <Col xs={12} md={6} xl={5}>
                            <Form.Label>Address line 1</Form.Label>
                            <Form.Control required name="address1" label="Address line 1" value={formInfo.address} onChange={(e) => setFormInfo({ ...formInfo, address: e.target.value })} />
                        </Col>
                    </Form.Row>

                    <Form.Row className={"justify-content-center"}>
                        <Col xs={12} md={6} xl={5}>
                            <Form.Label>City</Form.Label>
                            <Form.Control required name="city" label="City" value={formInfo.city} onChange={(e) => setFormInfo({ ...formInfo, city: e.target.value })} />
                        </Col>

                        <Col xs={12} md={6} xl={5}>
                            <Form.Label>Zip / Postal code</Form.Label>
                            <Form.Control required name="zip" label="Zip / Postal code" value={formInfo.zip} onChange={(e) => setFormInfo({ ...formInfo, zip: e.target.value })} />
                        </Col>
                    </Form.Row>

                    <Form.Row className={"justify-content-center"}>
                        <Col xs={12} md={6} xl={5}>
                            <Form.Label>Shiping Contry</Form.Label>
                            <Form.Control as="select"
                                required
                                onChange={(e) => handelSelect(e, setShippingCountry, "contry")}
                            >
                                <option></option>
                                {contries.map(contry => <option key={contry.id} value={contry.id}>{contry.name}</option>)}
                            </Form.Control>
                        </Col>

                        <Col xs={12} md={6} xl={5}>
                            {
                                shippingCountry &&
                                <>
                                    <Form.Label>States</Form.Label>
                                    <Form.Control as="select"
                                        required
                                        onChange={(e) => handelSelect(e, setShippingSubdivision, "state")}
                                    >
                                        <option></option>
                                        {subDevition.map(devition => <option key={devition.id} value={devition.id}>{devition.name}</option>)}
                                    </Form.Control>
                                </>
                            }
                        </Col>
                    </Form.Row>

                    <Form.Row className={"justify-content-center"}>
                        <Col xs={12} md={6} xl={5}>
                            <Form.Label>Shiping Options</Form.Label>
                            <Form.Control as="select"
                                required
                                onChange={(e) => handelSelect(e, setShippingOption, "shiping_option")}
                            >
                                <option></option>
                                {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.label}
                                    </option>))}
                            </Form.Control>
                        </Col>
                    </Form.Row>

                    <Form.Row className={"justify-content-center"}>
                        <Col xs={12} md={6} xl={5} className={"text-center"}>
                            <Link to={'/cart'}>
                                <Button variant="primary" className={'my-3'} >
                                    Back To Cart
                            </Button>
                            </Link>

                        </Col>
                        <Col xs={12} md={6} xl={5} className={"text-center"}>
                            <Button variant="success" type={"submit"} label="back" className={'my-3'}>
                                next
                    </Button>
                        </Col>
                    </Form.Row>

                </Form>
            </Col>
        </>
    )
}
