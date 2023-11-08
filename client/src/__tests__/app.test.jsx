import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';

import App from '../App';

test ('App renders correctly', () => {

    //reders the app component
    render(
        <Router>
            <App />
        </Router>);
        
    //this will hold a reference to an HTMl elememt
    //screen.getByText is a query function, searches for the rendered component 
    const homePageTitle = screen.getByText("rose: a therapy companion");
    const roseButton = screen.getByRole('button', {name: /rose/i});

    //assertion used to check whether homePage is present in the rendered component
    expect(homePageTitle).toBeInTheDocument();
    expect(roseButton).toBeInTheDocument();
});