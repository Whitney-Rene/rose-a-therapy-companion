import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login( {currentUser, setCurrentUser }) {

    //set up useRef for form, state
    const userEmail = useRef(null);
    const userPassword = useRef(null);
    const [loginError, setLoginError] = useState(null);

    //variable to store useNavigate react-router-dom
    const navigateTo = useNavigate();

    //function to handle login, async call to backend
    const handleLogin = async (event) => {

        //prevent the default nature of event
        event.preventDefault();

        const logInData = {
        user_email : userEmail.current?.value,
        user_password : userPassword.current?.value
        }
        
        //try/catch block for async call to api
        try {
        const response = await fetch ("http://localhost:9999/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(logInData),
        });

        const data = await response.json();
        
        //if login successful do this, if not show error message
        if (data.message === "Authentication successful"){
        const user_id = data.user_id;
        setCurrentUser({id: user_id});
        navigateTo("/");
        } else {
            setLoginError(data.error);
        }

        } catch (error) {
            console.error("API error", error)

        }
        
    };

        return (
        <>

        {/* login form, with button that triggers handleLogin */}
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
                <button onClick={(e)=> handleLogin(e)}>Log In</button>
                {/* if loginError is not empty, show error */}
                {loginError && <p>{loginError}</p>}
            </form>
        </>
    )
}
