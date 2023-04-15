import React from 'react';

const Register = () => {
    const handleSubmit=event=>{
        event.preventDefault();
        const email=event.target.email.value;
        const password=event.target.password.value;
        console.log(email,password);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" id="email" placeholder='Your email'/><br />
                <input type="password" name="password" id="password" placeholder='Your password'/><br />
                <input type="submit" value="Register" />
            </form>
        </div>
    );
};

export default Register;