import { render, screen, fireEvent, userEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import EntryForm from '../components/EntryForm';

test('HomePage renders child components', () => {
  render(
    <Router>
        <EntryForm />
    </Router>);

    const inputElement = screen.getByPlaceholderText(/type text here/i);
    const buttonElement = screen.getByRole('button', {name: 'Submit'});

    //TODO: replace with userEvent 
    fireEvent.change(inputElement, {target: {value: 'abundance mindset'}});
    fireEvent.click(buttonElement);
    const confirmationElement = screen.getByText(/entry submitted/i)

    expect(confirmationElement).toBeInTheDocument();
    // expect(inputElement).toBeInTheDocument();
    // expect(buttonElement).toBeInTheDocument();
});

//ISSUE: TestingLibraryElementError: Unable to find an element with the text: /entry submitted/i. 
    //This could be because the text is broken up by multiple elements. 
    //In this case, you can provide a function for your text matcher to make your matcher more flexible.
