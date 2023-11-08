import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';

import Login from "../components/Login";

test("Login component functionality", async () => {
    render(
        <Router>
            <Login />
        </Router>
    )

    const emailInput = screen.getByLabelText("Email:");
    const passwordInput = screen.getByLabelText("Password:");
    const loginButton = screen.getByText("Login");

    emailInput.value = "beEngWR@gmail.com";
    passwordInput = ""
})
