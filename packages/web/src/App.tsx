import React from 'react';
import { App as OrderBookApp } from 'common';
import Container from '@material-ui/core/Container';
import './App.css';

function App(): JSX.Element {
  return (
    <Container classes={{ root: 'App' }}>
      <OrderBookApp />
    </Container>
  );
}

export default App;
