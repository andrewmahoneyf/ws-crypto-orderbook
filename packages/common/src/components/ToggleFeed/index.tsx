import React from 'react';
import { useAppDispatch } from '../../hooks';
import { toggleFeed } from '../../state/orderbookSlice';
import IconButton from '../IconButton';

const ToggleFeed = (): JSX.Element => {
  const dispatch = useAppDispatch();
  return (
    <IconButton
      iconName="swap_horiz"
      onClick={() => dispatch(toggleFeed())}
      title="Toggle Feed"
    />
  );
};

export default ToggleFeed;
