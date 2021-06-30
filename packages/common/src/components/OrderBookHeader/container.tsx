import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setGrouping } from '../../state/orderbookSlice';
import {
  selectOrderbookGroup,
  selectOrderbookPair,
} from '../../state/selectors';
import { GROUP_OPTIONS } from '../../constants/orderBook';
import OrderBookHeaderPresentational from './presentational';

const OrderBookHeader = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const grouping = useAppSelector(selectOrderbookGroup);
  const selectedPair = useAppSelector(selectOrderbookPair);
  const handleChange = (value: number) => dispatch(setGrouping(value));
  const options = GROUP_OPTIONS[selectedPair];
  return (
    <OrderBookHeaderPresentational
      grouping={grouping}
      handleChange={handleChange}
      options={options}
    />
  );
};

export default OrderBookHeader;
