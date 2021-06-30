import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux';
import { selectOrderbookEnabled } from '../../state/selectors';
import { setOrderbookEnabled } from '../../state/orderbookSlice';
import IconButton from '../IconButton';

const KillFeedBtn = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const orderbookEnabled = useAppSelector(selectOrderbookEnabled);
  return (
    <IconButton
      iconName={orderbookEnabled ? 'error_outline' : 'catching_pokemon'}
      onClick={() => dispatch(setOrderbookEnabled(!orderbookEnabled))}
      style={{ backgroundColor: '#B91D1C' }}
      title={orderbookEnabled ? 'Kill Feed' : 'Restart Feed'}
    />
  );
};

export default KillFeedBtn;
