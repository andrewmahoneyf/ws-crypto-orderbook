import React, { memo, useMemo } from 'react';
import { useOrderLevels } from '../../hooks';
import { OrderLevel } from '../../types/orderBook';
import { DISPLAY_LEVELS } from '../../constants/orderBook';
import { OrderType } from '../../constants/enums';
import OrderBookPresentational from './presentational';

const getDisplayedLevels = (orders: OrderLevel[]): [OrderLevel[], number] => {
  const lvls = orders.slice(0, DISPLAY_LEVELS);
  const maxTotal = lvls[lvls.length - 1]?.total ?? 0;
  return [lvls, maxTotal];
};

const OrderBook: React.FC = memo(() => {
  const bids = useOrderLevels(OrderType.BIDS);
  const asks = useOrderLevels(OrderType.ASKS);

  const [highestBids, bidsTotal] = useMemo(
    () => getDisplayedLevels(bids),
    [bids],
  );
  const [lowestAsks, asksTotal] = useMemo(
    () => getDisplayedLevels(asks),
    [asks],
  );

  return (
    <OrderBookPresentational
      totalOrderSize={bidsTotal + asksTotal}
      highestBids={highestBids}
      lowestAsks={lowestAsks}
    />
  );
});

export default OrderBook;
