import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import App from '../app/components/App';

afterEach(cleanup);
describe('First test', () => {
  test('chat button works', () => {
    const { getByText } = render(<App />);
    const button = getByText(/sign in/i);

    fireEvent.click(button);

    expect(window.location.href).toBe('http://localhost/authenticate');
  });
});
