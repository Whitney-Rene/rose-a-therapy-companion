import { useState, useRef } from 'react';

export default function Login() {

    // const [loginError, setLoginError] = useState(null);
    // const userEmail = useRef(null);
    // const userPassword = useRef(null);

    // const handleLogin = async () => {
        
    // };

        return (
        <>
        <h2>Login</h2>
            <form>
                <div>
                    <label>Email:</label>
                    <input type="email"  />
                    {/* ref={userEmail} */}
                </div>
                <div>
                    <label>Password</label>
                    <input type='password'  />
                    {/* ref={userPassword} */}
                </div>
                <button onClick>Log In</button>
                {/* {loginError && <p>{loginError}</p>} */}
            </form>
        </>
    )
}