import React, { useState } from 'react';
import { Button, Form} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import {signIn} from '../../actions/api';

const initialState = {  email: '', password: '' };

const Signin = () => {
    const [form, setForm] = useState(initialState);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        signIn(form, history)
      };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <div className="container" style={{ paddingTop: "70px", width: "500px" }}>
            <div className="card" style={{ height: "50%", width: "130%" }}>
            <Form onSubmit={handleSubmit} style={{ margin: "10px" }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Enter email" onChange={handleChange} required/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" onChange={handleChange} required/>
                </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </div>
        </div>
    )
}

export default Signin
