import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import HomePage from '../components/HomePage';

test('HomePage renders child components', () => {

  //render HomePage comp
  render(
    <Router>
        <HomePage />
    </Router>);
  
  //grab button, make assertion
  const createComponentElem = screen.getByRole('button', {name: /rose/i});
  expect(createComponentElem).toBeInTheDocument();

});
