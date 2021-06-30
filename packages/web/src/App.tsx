import React from 'react';
import { App as OrderBookApp } from 'common';
import Container from '@material-ui/core/Container';
import './App.css';

const App = (): JSX.Element => (
  <Container classes={{ root: 'App' }}>
    <OrderBookApp />
  </Container>
);

export default App;
