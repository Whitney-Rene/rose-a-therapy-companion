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
        {
          ok: true, 
          json: () => Promise.resolve({
            "entry_id": 60,
            "entry_type": "bud",
            "entry_date": "2023-11-09T05:00:00.000Z",
            "entry_content": "how to destress",
            "user_id": 1
        }),
      })
    );

});

//want to always clear mocks, so it does not interfere with other tests
afterAll(() => {
  //needed to avoid issues
  vi.clearAllMocks()
});

test('Entry component is confirming new entry for user', async () => {
  
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

    expect(await screen.findByText(/entry submitted/i)).toBeInTheDocument();
});
