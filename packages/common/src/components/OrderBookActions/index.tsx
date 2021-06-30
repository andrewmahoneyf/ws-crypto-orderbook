import React from 'react';
import Container from '../Container';
import ToggleFeedBtn from '../ToggleFeedBtn';
import KillFeedBtn from '../KillFeedBtn';

const OrderBookActions = (): JSX.Element => (
  <Container
    style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
    <ToggleFeedBtn />
    <KillFeedBtn />
  </Container>
);

export default OrderBookActions;
