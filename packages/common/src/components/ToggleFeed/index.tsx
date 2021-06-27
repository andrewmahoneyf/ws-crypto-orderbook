import React from 'react';
import { useAppDispatch } from '../../hooks/react-redux';
import { toggle } from './feedSlice';
import IconButton from '../IconButton';

const ToggleFeed = (): JSX.Element => {
  const dispatch = useAppDispatch();
  return (
    <IconButton
      iconName="swap_horiz"
      onClick={() => dispatch(toggle())}
      title="Toggle Feed"
    />
  );
};

export default ToggleFeed;
