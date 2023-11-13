import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';

import RequestBouquet from "../components/RequestBouquet";

test ("buttons render in Request Bouquet comp", () => {
    
    //render RequestBouquet
    render(
    <Router>
        <RequestBouquet />
    </Router>);

    //this will hold a reference to an HTMl elememt
    const buttonElement = screen.getByRole('button', { name: /submit/i});
    //assertion
    expect(buttonElement).toBeInTheDocument();

    //this will hold a reference to an HTMl elememt
    const cancelButton = screen.getByRole('button', { name: /cancel/i});
    //assertion
    expect(cancelButton).toBeInTheDocument();

});
