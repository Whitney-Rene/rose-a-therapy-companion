import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from "msw/node";
import { loginHandler } from "../__mocks__/mocks";


import Login from "../components/Login";

//creates a server
const server = setupServer(loginHandler);

//start api testing b/4 tests
beforeAll(() => {
  server.listen();
});

//stop api testing after tests run
afterAll(() => {
  server.close();
});


test("Login component functionality", async () => {
    render(
        <Router>
            <Login />
        </Router>
    )

    const emailInput = screen.getByLabelText("Email:");
    const passwordInput = screen.getByLabelText("Password:");
    const loginButton = screen.getByText("Login");

    emailInput.value = 'test@example.com';
    passwordInput.value = 'password123';

    loginButton.click();

    await screen.findByText('Authentication successful');

});
