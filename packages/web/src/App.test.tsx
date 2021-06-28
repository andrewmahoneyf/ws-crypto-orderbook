import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'common';
import App from './App';

test('renders Order Book', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  expect(getByText(/Order Book/i)).toBeInTheDocument();
});
