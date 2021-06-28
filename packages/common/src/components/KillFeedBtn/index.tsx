import React, { useContext, useState } from 'react';
import { OrderBookContext } from '../OrderBookProvider';
import IconButton from '../IconButton';
import { ReadyState } from '../../constants/enums';
import { DEFAULT_OPTIONS } from '../../constants/orderBook';

const KillFeedBtn = (): JSX.Element => {
  const [btnState, setBtnState] = useState('live');
  const context = useContext(OrderBookContext);

  const handleToggleFeed = () => {
    const { disconnect, readyState, setShouldConnect, ws } = context;
    if (readyState === ReadyState[ReadyState.OPEN]) {
      setShouldConnect(false);
      ws?.dispatchEvent(new Event('error'));
      if (DEFAULT_OPTIONS.retryOnError) disconnect();
      setBtnState('killed');
    } else {
      setShouldConnect(true);
      setBtnState('live');
    }
  };

  return (
    <IconButton
      iconName={btnState === 'live' ? 'error_outline' : 'catching_pokemon'}
      onClick={handleToggleFeed}
      style={{ backgroundColor: '#B91D1C' }}
      title={btnState === 'live' ? 'Kill Feed' : 'Restart Feed'}
    />
  );
};

export default KillFeedBtn;
