import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';

import NavBar from "../components/NavBar";

test('NavBar should render links case-insensitively', () => {

    //render NavBar comp
    render(
    <Router>
        <NavBar />
    </Router>);
  
    //this will hold a reference to an HTMl elememt
    //'i' flag for case-insensitive search
    const homeLink = screen.getByText(/home/i);
    const requestLink = screen.getByText(/request a bouquet/i);
    const logoutLink = screen.getByText(/logout/i);
    
    //assertions
    expect(homeLink).toBeInTheDocument();
    expect(requestLink).toBeInTheDocument();
    expect(logoutLink).toBeInTheDocument();
    
  });
