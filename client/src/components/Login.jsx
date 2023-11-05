import { useState, useRef } from 'react';
import functions from '../../utils/functions';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [loginError, setLoginError] = useState(null);
    const userEmail = useRef(null);
    const userPassword = useRef(null);
    // const [authenticated, setAuthenticated] = useState(null);

    const navigateTo = useNavigate();

    const handleLogin = async () => {

        const logInData = {
            user_email : userEmail.current?.value,
            user_password : userPassword.current?.value
        }

        try {
            const response = await functions.postRequest("/login", logInData);
            console.log("API Response:", response);
            if (response.data.message === "Authentication successful"){
            // setAuthenticated(true);
            const user_id = response.data.user_id;
            navigateTo("/home");
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
                <button onClick={handleLogin}>Log In</button>
                {loginError && <p>{loginError}</p>}
            </form>
        </>
    )
}
