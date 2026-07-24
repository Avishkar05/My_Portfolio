import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('framer-motion', () => {
  const React = require('react');
  const Mock = React.forwardRef(
    ({ children, animate, initial, variants, whileInView, whileHover, viewport, transition, ...props }, ref) =>
      React.createElement('div', { ref, ...props }, children)
  );

  return {
    motion: new Proxy(
      {},
      {
        get: () => Mock,
      }
    ),
  };
});

test('renders portfolio hero content', () => {
  render(<App />);
  expect(screen.getAllByText(/avishkar zende/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/full-stack developer/i).length).toBeGreaterThan(0);
});
