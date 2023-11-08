import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';


import RequestBouquet from "../components/RequestBouquet";

test ("buttons render", () => {
    render(
    <Router>
        <RequestBouquet />
    </Router>);

    //this will hold a reference to an HTMl elememt
    const buttonElement = screen.getByRole('button', { name: 'submit'});
    //assertion
    expect(buttonElement).toBeInTheDocument();

    //this will hold a reference to an HTMl elememt
    const cancelButton = screen.getByRole('button', { name: "cancel" });
    //assertion
    expect(cancelButton).toBeInTheDocument();


});