import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../types/redux';

export const selectSnackbarAlerts = (state: RootState) => state.snackbar.alerts;

const orderbookSelector = (state: RootState) => state.orderbook;

export const selectOrderbookEnabled = createSelector(
  orderbookSelector,
  orderbook => orderbook.enabled,
);

export const selectOrderbookPair = createSelector(
  orderbookSelector,
  orderbook => orderbook.pair,
);

export const selectOrderbookGroup = createSelector(
  orderbookSelector,
  orderbook => orderbook.grouping,
);
