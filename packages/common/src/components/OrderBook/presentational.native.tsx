import React, { memo } from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { OrderType } from '../../constants/enums';
import { OrderLevel } from '../../types/orderBook';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  orderbook: {
    display: 'flex',
    justifyContent: 'space-evenly',
    backgroundColor: '#121726',
    marginTop: 3,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  table: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    color: 'grey',
  },
  bidsBody: {
    display: 'flex',
    flexDirection: 'column-reverse',
    width: '100%',
  },
  aksBody: {
    marginTop: 20,
    width: '100%',
  },
});

interface OrderRowProps {
  color: string;
  direction: string;
  price: number;
  size: number;
  total: number;
  width: number;
}

const toLocaleString = (num: number | string) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const OrderRow: React.FC<OrderRowProps> = memo(
  ({ color, direction, price, size, total, width }) => (
    <View style={styles.row}>
      <View
        style={{
          height: '100%',
          width: 20,
          position: 'absolute',
          right: 0,
          borderRightColor: color,
          borderRightWidth: SCREEN_WIDTH * width,
          opacity: 0.3,
          zIndex: -1,
        }}
      />
      <Text style={{ color }}>{toLocaleString(price.toFixed(2))}</Text>
      <Text style={{ color: 'white' }}>{toLocaleString(size)}</Text>
      <Text style={{ color: 'white' }}>{toLocaleString(total)}</Text>
    </View>
  ),
);

interface PresentationalProps {
  highestBids: OrderLevel[];
  lowestAsks: OrderLevel[];
  totalOrderSize: number;
  width: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const OrderBookPresentational: React.FC<PresentationalProps> = memo(
  ({ highestBids, lowestAsks, totalOrderSize, width }) => {
    return (
      <View style={styles.orderbook}>
        <View style={styles.row}>
          <Text style={styles.headerText}>PRICE</Text>
          <Text style={styles.headerText}>SIZE</Text>
          <Text style={styles.headerText}>TOTAL</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.bidsBody}>
            {highestBids.map(({ price, size, total }) => (
              <OrderRow
                key={`${OrderType.BIDS}-${price}`}
                color="rgb(11, 160, 114)"
                direction="left"
                price={price}
                size={size}
                width={(total * 100) / totalOrderSize / 100}
                total={total}
              />
            ))}
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.aksBody}>
            {lowestAsks.map(({ price, size, total }) => (
              <OrderRow
                key={`${OrderType.ASKS}-${price}`}
                color="rgb(185, 29, 28)"
                direction="left"
                price={price}
                size={size}
                width={(total * 100) / totalOrderSize / 100}
                total={total}
              />
            ))}
          </View>
        </View>
      </View>
    );
  },
);

export default OrderBookPresentational;
