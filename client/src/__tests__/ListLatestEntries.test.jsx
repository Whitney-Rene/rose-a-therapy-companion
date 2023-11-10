import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from 'react-router-dom';

import ListLatestEntries from '../components/ListLatestEntries';

//store userEvent method as a variable, easier to write and understand
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

  // Assert that the rendered entries are present
  await waitFor( () => {
    const roseEntry = screen.getByText(/some rose content/i);
    expect(roseEntry).toBeInTheDocument();
  });

  await waitFor( () => {
    const budEntry = screen.getByText(/some bud content/i); 
    expect(budEntry).toBeInTheDocument();});

});

test('edit icon apperas for entries entry', async () => {
  
  render(
    <Router>
        <ListLatestEntries />
    </Router>);

//edit icons are present
  await waitFor( () => {
    const editButtons = screen.getAllByTestId("EditTwoToneIcon");
    user.click(editButtons[0]);
  });

});

//LEARNED:
  //screen.debug();
