import { OrderBookMessage } from '../types/orderBook';

type WsEvent = { event?: string; message?: string };

function isExpectedType(o: OrderBookMessage | WsEvent): o is OrderBookMessage {
  return 'asks' in o && 'bids' in o;
}

type ParseResult = { value?: OrderBookMessage; error?: Error };

const parseJSON = (text: string): ParseResult => {
  try {
    const value = JSON.parse(text) as OrderBookMessage | WsEvent;
    if (isExpectedType(value)) return { value };
    if (value.event === 'alert') throw new Error(value.message);
    return {};
  } catch (err) {
    return {
      error: err as Error,
    };
  }
};

export default parseJSON;
