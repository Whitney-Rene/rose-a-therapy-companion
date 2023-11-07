import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';


import RequestBouquet from "../components/RequestBouquet";

test ("buttons render", () => {
    render(
    <Router>
        <RequestBouquet />
    </Router>);

    const buttonElement = screen.getByRole('button', { name: 'submit'});
    expect(buttonElement).toBeInTheDocument();

    const cancelButton = screen.getByRole('button', { name: "cancel" });
    expect(cancelButton).toBeInTheDocument();


});