import { useContext, useMemo, useCallback } from 'react';
import { useAppSelector } from './react-redux';
import { selectOrderbookGroup } from '../state/selectors';
import { OrdersPriceMap, OrderLevel } from '../types/orderBook';
import { OrderBookContext } from '../components/OrderBookProvider';
import { OrderType } from '../constants/enums';

const useOrderLevels = (side: OrderType): OrderLevel[] => {
  const context = useContext(OrderBookContext);
  const grouping = useAppSelector(selectOrderbookGroup);
  const { [side]: orders } = context;

  const getOrderLevels = useCallback(
    (priceMap: OrdersPriceMap) => {
      return Object.entries(priceMap)
        .sort((a, b) =>
          side === OrderType.BIDS
            ? b[0].localeCompare(a[0])
            : a[0].localeCompare(b[0]),
        )
        .reduce((acc: OrderLevel[], [price, size]: [string, number]) => {
          const groupPrice =
            Math.floor(parseFloat(price) / grouping) * grouping;
          const recentLvl = acc[acc.length - 1] ?? { total: 0 };
          if (recentLvl.price === groupPrice) {
            recentLvl.size += size;
            recentLvl.total += size;
            return acc;
          }
          return [
            ...acc,
            { price: groupPrice, size, total: recentLvl.total + size },
          ];
        }, []);
    },
    [grouping, side],
  );

  const orderLevels = useMemo(() => {
    return getOrderLevels(orders);
  }, [orders, getOrderLevels]);

  return orderLevels;
};

export default useOrderLevels;
