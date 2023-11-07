import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import App from './App';

test ('App renders correctly', () => {

    //reders the app component
    render(<App />);
    //this will hold a reference to an HTMl elememt
    //screen.getByText is a query function, searches for the rendered component 
    const homePage = screen.getByText("HomePage")

    //assertion used to check whether homePage is present in the rendered component
    expect(homePage).toBeInTheDocument();
});