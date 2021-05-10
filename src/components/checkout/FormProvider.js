
import React from 'react';
import { Form, Button, Row, Container, Col } from 'react-bootstrap';
import { useFormContext, Controller } from 'react-hook-form';

function FormHandler({ name, label, required }) {

    const { control } = useFormContext();
    const isError = false;
    return (
        <Form.Group >
            <Controller
                as={Form.Control}
                name={name}
                control={control}
                label={label}
                fullWidth
                required={required}
                error={isError}
            />
        </Form.Group>

    );
}

export default FormHandler;


