import React, { memo } from 'react';
import Container from '../Container';
import ToggleFeedBtn from '../ToggleFeedBtn';
import KillFeedBtn from '../KillFeedBtn';

const OrderBookActions = memo((): JSX.Element => {
  return (
    <Container>
      <ToggleFeedBtn />
      <KillFeedBtn />
    </Container>
  );
});

export default OrderBookActions;
