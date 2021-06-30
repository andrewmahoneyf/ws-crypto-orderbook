import React, { memo, useMemo } from 'react';
import { useOrderLevels } from '../../hooks';
import { OrderLevel } from '../../types/orderBook';
import {
  DISPLAY_LEVELS,
  MOBILE_DISPLAY_LEVELS,
} from '../../constants/orderBook';
import { useDeviceDetect } from '../../hooks';
import { OrderType } from '../../constants/enums';
import OrderBookPresentational from './presentational';

const getDisplayedLevels = (
  orders: OrderLevel[],
  isMobile: boolean,
): [OrderLevel[], number] => {
  const lvls = orders.slice(
    0,
    isMobile ? MOBILE_DISPLAY_LEVELS : DISPLAY_LEVELS,
  );
  const maxTotal = lvls[lvls.length - 1]?.total ?? 0;
  return [lvls, maxTotal];
};

const OrderBook: React.FC = memo(() => {
  const { isMobile } = useDeviceDetect();
  const bids = useOrderLevels(OrderType.BIDS);
  const asks = useOrderLevels(OrderType.ASKS);

  const [highestBids, bidsTotal] = useMemo(
    () => getDisplayedLevels(bids, isMobile),
    [bids],
  );
  const [lowestAsks, asksTotal] = useMemo(
    () => getDisplayedLevels(asks, isMobile),
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
