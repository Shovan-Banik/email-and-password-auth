import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const RegisterRBS = () => {
    const [rsError, setRsError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        setSuccess('');
        setRsError('');

        const email = event.target.email.value;
        const password = event.target.password.value;
        const name=event.target.name.value;
        console.log(name,email, password);

        // validate strength of password
        if (!/(?=.*[A-Z])/.test(password)) {
            setRsError('Please add at least one Uppercase letter');
            return;
        }
        else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
            setRsError('Please add at least two numbers');
            return;
        }
        else if (password.length < 6) {
            setRsError('please add at least 6 characters');
            return;
        }

        // create user in firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setRsError('');
                event.target.reset();
                setSuccess('register successfully done');
                sendVerificationEmail(result.user);
                updateUserData(result.user, name);
            })
            .catch(error => {
                console.error(error.message);
                setRsError(error.message);
            })
    }


    const updateUserData = (user, name) => {
        updateProfile(user, {
            displayName: name
        })
            .then(() => {
                console.log('user name updated')
            })
            .catch(error => {
                setRsError(error.message)
            })
    }

    const sendVerificationEmail = (user) => {
        sendEmailVerification(user)
            .then(result => {
                console.log(result);
                alert('Please verify your email address')
            })
    }
    return (
        <div className='my-3'>
            <h2 className='text-primary'>Please register</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" name='name' required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name='email' required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name='password' required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Accept terms and conditions" />
                </Form.Group>
                <p className='text-danger'>{rsError}</p>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <p><small>Already have an account ? <Link to="/login">LogIn</Link></small></p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default RegisterRBS;