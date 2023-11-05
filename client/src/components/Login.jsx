import { useState, useRef } from 'react';
import functions from '../../utils/functions';
import { useNavigate } from 'react-router-dom';

export default function Login( {currentUser, setCurrentUser }) {

    const userEmail = useRef(null);
    const userPassword = useRef(null);

    const navigateTo = useNavigate();

    const handleLogin = async () => {

        const logInData = {
        user_email : userEmail.current?.value,
        user_password : userPassword.current?.value
        }
        
        try {
        const response = await fetch ("http://localhost:9999/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(logInData),
        });

        if (response.data.message === "Authentication successful"){
        const user_id = response.data.user_id;
        setCurrentUser({id: user_id});
        // navigateTo("/home");
        } else {
            setLoginError(response.data.error);
        }
        } catch (error) {
            console.error("API error", error)

        }
        
    };

        return (
        <>
        <h2>Login</h2>
            <form>
                <div>
                    <label>Email:</label>
                    <input type="text"  ref={userEmail}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type='text'  ref={userPassword}/>
                </div>
                <button onClick={()=> handleLogin()}>Log In</button>
                {/* {loginError && <p>{loginError}</p>} */}
            </form>
        </>
    )
}
