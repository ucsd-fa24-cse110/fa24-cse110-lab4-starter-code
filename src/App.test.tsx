// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders My Budget Planner title', () => {
  render(<App />);
  const titleElement = screen.getByText(/My Budget Planner/i); // Replace with actual text in your App
  expect(titleElement).toBeInTheDocument();
});
