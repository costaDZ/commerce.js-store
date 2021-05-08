
import React from 'react';
import { Form, Button, Row, Container, Col } from 'react-bootstrap';

function FormInput({ name, type, required, holder }) {

    return (

        <Form.Group >
            <Form.Label>{name}</Form.Label>
            <Form.Control type={type} placeholder={holder} required={required} />
        </Form.Group>

    );
}

export default FormInput;