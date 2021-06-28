import React from 'react';
import Container from '../components/Container';
import OrderBook from '../components/OrderBook';
import OrderBookActions from '../components/OrderBookActions';
import OrderBookHeader from '../components/OrderBookHeader';
import OrderBookProvider from '../components/OrderBookProvider';

const OrderBookWithContext = (): JSX.Element => (
  <OrderBookProvider>
    <OrderBook />
    <OrderBookActions />
  </OrderBookProvider>
);

const App = (): JSX.Element => {
  return (
    <Container
      style={{ backgroundColor: 'rgb(43 50 63)', width: '100%', padding: 5 }}>
      <OrderBookHeader />
      <OrderBookWithContext />
    </Container>
  );
};

export default App;
