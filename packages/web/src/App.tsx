import React from 'react';
import { App as OrderBookApp, GlobalSnackbar } from 'common';
import Container from '@material-ui/core/Container';
import './App.css';

const App = (): JSX.Element => (
  <Container classes={{ root: 'App' }}>
    <OrderBookApp />
    <GlobalSnackbar />
  </Container>
);

export default App;
