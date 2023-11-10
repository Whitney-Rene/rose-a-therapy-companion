import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from 'react-router-dom';

import ListLatestEntries from '../components/ListLatestEntries';

const user = userEvent.setup();

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
      ok: true
      })
    );

});

//want to always clear mocks, so it does not interfere with other tests
afterAll(() => {
  //needed to avoid issues
  vi.clearAllMocks()
});

test('list entries on page', async () => {
    render(
    <Router>
        <ListLatestEntries />
    </Router>);

      // Wait for the component to render and fetch data
  await screen.findByText(/your latest rose, bud and thorns/i);

  // Assert that the rendered entries are present
 await waitFor( () => {const roseEntry = screen.getByText(/some rose content/i); screen.debug(); expect(roseEntry).toBeInTheDocument();});
  // const budEntry = screen.getByText(/some bud content/i);

  
  // expect(budEntry).toBeInTheDocument();
});

test('test, edit entry', async () => {
  render(
    <Router>
        <ListLatestEntries />
    </Router>);

  await waitFor( () => {
    const editButtons = screen.getAllByTestId("EditTwoToneIcon");
    user.click(editButtons[0]);
  });

  screen.debug();
  
  // const updateButton = screen.getByRole('button', {name: /update entry/i});
  // const cancelButton = screen.getByRole('button', {name: /cancel/i});

  // expect(updateButton).toBeInTheDocument();
  // expect(cancelButton).toBeInTheDocument();

});

//PASSED
