import { render, screen, mockRouter } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import CreateRoseBudThorn from '../components/CreateRoseBudThorn';

test('CreateRoseBudThorn component renders buttons', () => {

    render( 
    <Router>
        <CreateRoseBudThorn />
    </Router>);
  
  // Check if the component renders the buttons
  const roseButton = screen.getByRole('button', {name: "rose"});
  const budButton = screen.getByRole('button', {name: "bud"});
  const thornButton = screen.getByRole('button', {name: "thorn"});
  
  expect(roseButton).toBeInTheDocument();
  expect(budButton).toBeInTheDocument();
  expect(thornButton).toBeInTheDocument();
});

//integration test here??

//ISSUE: 
    //Test 1:  FAIL  src/__tests__/CreateRoseBudThorn.test.jsx > CreateRoseBudThorn component renders buttons
    // Error: Invalid Chai property: toBeInTheDocument

    //Test 2: 
