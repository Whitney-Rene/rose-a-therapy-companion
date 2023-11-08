import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';

import Login from "../components/Login";

test("Login component functionality", () => {
    render(
        <Router>
            <Login />
        </Router>
    )

})
