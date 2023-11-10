import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';

import EditEntry from '../components/EditEntry';

test('buttons render', () => {
  
  render(
    //necessary to mock the state as well, if you use location.state in component
    <Router initialEntries={[{pathname: "/edit/12", state: {}}]}>
        <EditEntry />
    </Router>);

    const updateButton = screen.getByRole('button', {name: /update entry/i});
    const cancelButton = screen.getByRole('button', {name: /cancel/i});

    expect(updateButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();

});
