import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import { fakeStoreApi } from '../redux/api';

const server = setupServer(
  rest.post('https://fakestoreapi.com/auth/login', (req, res, ctx) => {
    const { username, password } = req.body;
    if (username === 'validUser' && password === 'validPassword') {
      return res(ctx.json({ token: 'fakeAuthToken' }));
    } else {
      return res(ctx.status(401), ctx.json({ message: 'Invalid credentials' }));
    }
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('Login form submits with valid credentials', async () => {
  render(
    <Router>
      <Login setToken={() => {}} />
    </Router>
  );

  fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'validUser' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'validPassword' } });
  fireEvent.click(screen.getByText('Submit'));

  await waitFor(() => expect(screen.queryByText('Logging in...')).not.toBeInTheDocument());
  expect(screen.queryByText('Redirecting...')).toBeInTheDocument();
});

test('Login form shows error with invalid credentials', async () => {
  render(
    <Router>
      <Login setToken={() => {}} />
    </Router>
  );

  fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'invalidUser' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'invalidPassword' } });
  fireEvent.click(screen.getByText('Submit'));

  await waitFor(() => expect(screen.queryByText('Logging in...')).not.toBeInTheDocument());
  expect(screen.queryByText('Invalid credentials')).toBeInTheDocument();
});
