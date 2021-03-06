import React from 'react';
import Container from '../components/Container';
import OrderBook from '../components/OrderBook';
import OrderBookActions from '../components/OrderBookActions';
import OrderBookHeader from '../components/OrderBookHeader';
import OrderBookProvider from '../components/OrderBookProvider';

const App = (): JSX.Element => (
  <Container style={{ backgroundColor: '#2b323f', width: '100%', padding: 5 }}>
    <OrderBookHeader />
    <OrderBookProvider>
      <OrderBook />
    </OrderBookProvider>
    <OrderBookActions />
  </Container>
);

export default App;
