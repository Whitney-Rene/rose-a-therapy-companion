import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import EntryForm from '../components/EntryForm';

test('HomePage renders child components', () => {
  render(
    <Router>
        <EntryForm />
    </Router>);

    const inputElement = screen.getByPlaceholderText(/type text here/i);
    const buttonElement = screen.getByRole('button', {name: 'submit'});

    fireEvent.change(inputElement, {target: {value: 'abundance mindset'}});
    fireEvent.click(buttonElement);
    const budElement = screen.getByText(/abundance mindset/)

    expect(budElement).toBeInTheDocument();
    // expect(inputElement).toBeInTheDocument();
    // expect(buttonElement).toBeInTheDocument();
});