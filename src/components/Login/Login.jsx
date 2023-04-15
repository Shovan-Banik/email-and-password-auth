import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../../firebase/firebase.config';

const auth = getAuth(app);

const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef();

    const handleLogIn = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        // validation
        setError('');
        setSuccess('');
        const name=event.target.valie;

        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError("please add at least two Uppercase");
            return;
        }
        else if (!/(?=.*[!@#$&*])/.test(password)) {
            setError('Please add a special character');
            return;
        }
        else if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setSuccess('Successfully logged In');
                setError('');
            })
            .catch(error => {
                setError(error.message);
            })
    }
    const handleResetPassword = (event) => {
        const email = emailRef.current.value;
        if (!email) {
            alert('please provide your email address to reset password');
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Please check your email");
            })
            .catch(error => {
                console.log(error);
                setError(error.message)
            })
    }
    const showPassword=()=>{
        const input=document.getElementById('pass');
        if(input.type==='password'){
            input.type='text';
        }else{
            input.type='password';
        }
    }

    return (
        <div>
            <h2>Login please</h2>
            <form onSubmit={handleLogIn}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="email" className="form-control" ref={emailRef} id="username" placeholder="Enter your Email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" className="form-control" id="pass" placeholder="Enter password" />
                    <input type="checkbox" onClick={showPassword} value="show password"/>
                </div>
                <button type="submit" className="btn btn-primary mt-2">Submit</button>
            </form>
            <p><small>Forget password? Please <button onClick={handleResetPassword} className='btn btn-link'>Reset password</button></small></p>
            <p><small>new to this website ? Please <Link to="/register-rbs">Register</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Login;