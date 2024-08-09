import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App';

jest.mock('@pages', () => ({
  Homepage: () => <div>Homepage Component</div>,
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: () => <div>Outlet Component</div>,
}));

describe('App Component', () => {
  test('renders Outlet and Homepage components', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(getByText('Outlet Component')).toBeInTheDocument();
    expect(getByText('Homepage Component')).toBeInTheDocument();
  });
});

test('renders App component', () => {
    render(<App />);
});