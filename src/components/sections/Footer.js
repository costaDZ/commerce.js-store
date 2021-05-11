import React from 'react';

import { Container, Row, Col, ListGroup } from "react-bootstrap";
import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import logo from '../../img/commerce.png';
export const Footer = () => {
    return (
        <footer className="footer-area border-top border-5">
            <div className="footer-big bg-light">
                <Container fluid className="py-4">
                    <Row className="row">
                        <Col className="col-12 col-md-6 col-lg-3">
                            <div className="widget-about text-center">
                                <img src={logo} alt="logo" className="img-fluid mx-auto" style={{ height: "70px", width: "70px" }} />
                                <p>Phones Commerce.DZ</p>
                            </div>
                            <ListGroup variant="flush text-center text-sm-left" className="bg-light">
                                <h6>Contact : </h6>
                                <ListGroup.Item className="bg-light" >
                                    <PhoneIcon /> Call Us: 344-755-111
                                        </ListGroup.Item>
                                <ListGroup.Item className="bg-light">
                                    <MailOutlineIcon /> casacasino7@gmail.com
                                        </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col className="col-12 col-md-6 col-lg-3 py-2 ">

                            <h6 className="footer-widget-title">Popular Categories</h6>
                            <ListGroup variant="flush text-center text-sm-left ">
                                <ListGroup.Item className="bg-light">
                                    <a href="#">Oppo</a>
                                </ListGroup.Item>
                                <ListGroup.Item className="bg-light">
                                    <a href="#">Iphone</a>
                                </ListGroup.Item>
                                <ListGroup.Item className="bg-light">
                                    <a href="#">Huawee</a>
                                </ListGroup.Item>
                                <ListGroup.Item className="bg-light">
                                    <a href="#">Sumsung</a>
                                </ListGroup.Item>
                                <ListGroup.Item className="bg-light">
                                    <a href="#">Galaxy</a>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>

                        <Col className="col-12 col-md-6 col-lg-3 py-2">
                            <h6 className="footer-widget-title">Our Company</h6>
                            <ListGroup variant="flush text-center text-sm-left">
                                <ListGroup.Item className="bg-light">
                                    <a href="#">About Us</a>
                                </ListGroup.Item>
                                <ListGroup.Item className="bg-light">
                                    <a href="#">How It Works</a>
                                </ListGroup.Item>
                                <ListGroup.Item className="bg-light">
                                    <a href="#">Affiliates</a>
                                </ListGroup.Item>
                                <ListGroup.Item className="bg-light">
                                    <a href="#">Testimonials</a>
                                </ListGroup.Item>
                                <ListGroup.Item className="bg-light">
                                    <a href="#">Contact Us</a>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>

                        <Col className="col-12 col-md-6 col-lg-3  py-2">

                            <h6 className="footer-widget-title">Help Support</h6>
                            <ListGroup variant="flush text-center text-sm-left">
                                <ListGroup.Item className="bg-light">
                                    <a href="#">Support Forum</a>
                                </ListGroup.Item>
                                <ListGroup.Item className="bg-light">
                                    <a href="#">Terms &amp; Conditions</a>
                                </ListGroup.Item>
                                <ListGroup.Item className="bg-light">
                                    <a href="#">Support Policy</a>
                                </ListGroup.Item>
                                <ListGroup.Item className="bg-light">
                                    <a href="#">Refund Policy</a>
                                </ListGroup.Item>
                                <ListGroup.Item className="bg-light">
                                    <a href="#">FAQs</a>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>

                    </Row >
                </Container >
            </div >

            <div className="min-footer bg-dark text-center my-0 py-1 text-white" >
                <p className="my-0 py-2" >© 2021 Created by Aissa Nadjem Eddine </p>
            </div >
        </footer >
    )
}
