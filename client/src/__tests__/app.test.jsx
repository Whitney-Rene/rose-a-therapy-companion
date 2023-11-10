import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from 'react-router-dom';

import App from '../App';

const user = userEvent.setup();

//unit testing - the user can't see this, test for ids-commonly
//toHaveAttribute("name", "entry_date")

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

//how user interacts with application, what they see on the page
test ('clicking on login button takes user to login page', async () => {

    render(
        <Router>
            <App />
        </Router>);

    const logoutButton = screen.getByRole('link', {name: /logout/i});
    expect(logoutButton).toBeInTheDocument();

    await user.click(logoutButton);
    const loginButton = screen.getByRole('button', {name: /login/i});
    expect(loginButton).toBeInTheDocument();

});
