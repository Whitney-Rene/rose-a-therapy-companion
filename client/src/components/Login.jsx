//imports from react and libraries
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/Login.css';
import { Typography, Button } from '@mui/material';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import TextField from '@mui/material/TextField';

export default function Login( {currentUser, setCurrentUser }) {

    //set up useRef for form, state
    const userEmail = useRef(null);
    const userPassword = useRef(null);
    const [createNewUserMsg, setcreateNewUserMsg] = useState(false);
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
        const user_name = data.user_name;
        setCurrentUser({id: user_id, name: user_name});
        navigateTo("/");
        } else {
            setcreateNewUserMsg(false);
            setLoginError(data.error);
        }

        } catch (error) {
            console.error("API error", error)
        }
        
    };

    const createAccount = (event) => {
        event.preventDefault();

        setLoginError(null);
        setcreateNewUserMsg(true);
    }

    return (
    
        <div className='login-container'>

            <div className='login-box'>

            <div className='logo'>

                <SpaOutlinedIcon className="rose-icon" />

                <Typography className="app-name"> 
                rose: a therapy companion 
                </Typography>

            </div>

            {/* login form, with button that triggers handleLogin */}
                <Typography variant="h2" className='login'>Login</Typography>

                <form autoComplete='off'>

                    <div>
                        <TextField className="input-box" required  label="email" type="text" inputRef={userEmail}/>
                    </div>

                    <div>
                        <TextField className="input-box" required label="password" type='password' inputRef={userPassword}/>
                    </div>

                    <Button type="submit" className="login-button" onClick={(e)=> handleLogin(e)}> 
                    login
                    </Button>

                    <Button type="submit" className="create-account-button" onClick={(e)=> createAccount(e)}>create an account</Button>

                    {/* if loginError is not empty, show error */}
                    {loginError && <p className='error-message'>{loginError}</p>}
                    {createNewUserMsg && <p className='create-user-message'>This is a future feature.</p>}

                </form>

            </div>
            
        </div>

    );
};
