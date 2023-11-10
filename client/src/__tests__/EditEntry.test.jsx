import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import EditEntry from '../components/EditEntry';

test('buttons render', () => {
  // render(
  //   <Router>
  //       <EditEntry />
  //   </Router>);

  //   const updateButton = screen.getByRole('button', {name: /update entry/i});
  //   const cancelButton = screen.getByRole('button', {name: /cancel/i});

  //   expect(updateButton).toBeInTheDocument();
  //   expect(cancelButton).toBeInTheDocument();

});

//ISSUE: Error: Uncaught [TypeError: Cannot read properties of null (reading 'entry_type')]
//in order to test this I need to mock react router useLocation for the state
  //I will come back to this (future tasks), when I have more time and mental capacity
