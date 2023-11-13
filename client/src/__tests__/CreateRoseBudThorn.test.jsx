import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import CreateRoseBudThorn from '../components/CreateRoseBudThorn';

test('CreateRoseBudThorn component renders buttons', () => {

  render( 
  <Router>
      <CreateRoseBudThorn />
  </Router>);
  
  //this will hold a reference to an HTMl elememt
  const roseButton = screen.getByRole('button', {name: "rose"});
  const budButton = screen.getByRole('button', {name: "bud"});
  const thornButton = screen.getByRole('button', {name: "thorn"});
  
  //assertions
  expect(roseButton).toBeInTheDocument();
  expect(budButton).toBeInTheDocument();
  expect(thornButton).toBeInTheDocument();
  
});
