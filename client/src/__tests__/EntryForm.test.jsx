import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from 'react-router-dom';

import EntryForm from '../components/EntryForm';

const user = userEvent.setup();

//update mock to simulate handle submit
beforeAll(() => {
  // Mock the global fetch function with a custom implementation
    global.fetch = vi.fn()
    fetch.mockReturnValue(
      Promise.resolve(
        { json: () => Promise.resolve([
          {
            entry_id: 1,
            entry_type: 'Rose',
            entry_content: 'Some rose content',
          },
          {
            entry_id: 2,
            entry_type: 'Bud',
            entry_content: 'Some bud content',
          },
          ]),
      })
    );

});

//want to always clear mocks, so it does not interfere with other tests
afterAll(() => {
  //needed to avoid issues
  vi.clearAllMocks()
});

test('HomePage renders child components', async () => {
  render(
    <Router>
        <EntryForm />
    </Router>);

    const inputElement = screen.getByRole('textbox');
    const dateElement = screen.getByLabelText(/date:/i);
    expect(dateElement).toBeInTheDocument();
    const buttonElement = screen.getByRole('button', {name: 'Submit'});
 
    await user.type(dateElement, "2023-11-09");
    expect(dateElement).toHaveValue('2023-11-09');
    await user.type(inputElement, 'abundance mindset');
    await user.click(buttonElement);
    await waitFor(() => {
      const confirmationElement = screen.getByText(/entry submitted/i)
    });

    expect(confirmationElement).toBeInTheDocument();
    // expect(inputElement).toBeInTheDocument();
    // expect(buttonElement).toBeInTheDocument();
});

//ISSUE: TestingLibraryElementError: Unable to find an element with the text: /entry submitted/i. 
    //This could be because the text is broken up by multiple elements. 
    //In this case, you can provide a function for your text matcher to make your matcher more flexible.
