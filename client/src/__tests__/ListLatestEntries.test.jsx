import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import ListLatestEntries from '../components/ListLatestEntries';

beforeAll(() => {
  // Mock the global fetch function with a custom implementation
  globalThis.fetch = async () => {
    return {
      json: async () => [
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
      ],
    };
  };
});

test('list entries on page', async () => {
    render(
    <Router>
        <ListLatestEntries />
    </Router>);

      // Wait for the component to render and fetch data
  await screen.findByText(/your latest rose, bud and thorns/i);

  // Assert that the rendered entries are present
  const roseEntry = screen.getByText(/some rose content/i);
  const budEntry = screen.getByText(/some bud content/i);

  expect(roseEntry).toBeInTheDocument();
  expect(budEntry).toBeInTheDocument();
});

afterAll(() => {
  // Clean up the global fetch mock after the tests
  delete globalThis.fetch;
});

//ISSUE: TestingLibraryElementError: Unable to find an element with the text: Some rose content. 
    //This could be because the text is broken up by multiple elements. 
    //In this case, you can provide a function for your text matcher to make your matcher more flexible.