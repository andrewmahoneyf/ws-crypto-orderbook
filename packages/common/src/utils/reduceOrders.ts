import { OrdersPriceMap } from '../types/orderBook';

const reduceOrders = (
  initialOrders: OrdersPriceMap,
  newOrders: [number, number][],
): OrdersPriceMap => {
  return newOrders.reduce(
    (acc, [price, size]) => {
      if (size > 0) acc[price] = size;
      else delete acc[price];
      return acc;
    },
    { ...initialOrders },
  );
};

export default reduceOrders;
