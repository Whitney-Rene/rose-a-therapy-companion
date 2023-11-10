import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';

import Login from "../components/Login";

test('NavBar should render links case-insensitively', () => {
    render(
    <Router>
        <Login />
    </Router>);
  
    //this will hold a reference to an HTMl elememt
    //'i' flag for case-insensitive search
    const emailLabel = screen.getByText(/email:/i);
    const passwordLabel = screen.getByText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i});
    const pageTitle = screen.getByRole('heading', {level: 2, name: /login/i});
    
    //assertions
    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });

  //Learned: 
    //there is a priority in matchers, getByRole is #1
