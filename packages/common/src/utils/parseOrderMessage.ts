import { OrderBookMessage } from '../types/orderBook';
import { WsEvent } from '../types/webSocket';
import { EventType } from '../constants/enums';

function isExpectedType(o: OrderBookMessage | WsEvent): o is OrderBookMessage {
  return 'asks' in o && 'bids' in o;
}

type ParseResult = {
  orders?: OrderBookMessage;
  data?: WsEvent;
  error?: Error;
};

const parseJSON = (text: string): ParseResult => {
  try {
    const data = JSON.parse(text) as OrderBookMessage | WsEvent;
    if (isExpectedType(data)) return { orders: data };
    if (data.event === EventType.ALERT) throw new Error(data.message);
    return { data };
  } catch (err) {
    return {
      error: err as Error,
    };
  }
};

export default parseJSON;
