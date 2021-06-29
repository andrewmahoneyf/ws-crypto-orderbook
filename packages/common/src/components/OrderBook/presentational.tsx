import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { OrderType } from '../../constants/enums';
import { OrderLevel } from '../../types/orderBook';
import Container from '../Container';

const useStyles = makeStyles(theme => ({
  orderbook: {
    display: 'flex',
    justifyContent: 'space-evenly',
    background: '#121726',
    marginTop: 3,
    paddingBottom: 5,
  },
  table: {
    display: 'flex',
    flexWrap: 'wrap',
    '& thead, tbody': {
      width: '100%',
    },
    '& tr': {
      display: 'flex',
    },
    '& th, td': {
      padding: 5,
      paddingRight: '10%',
      fontWeight: 600,
      borderBottom: 'none',
      textAlign: 'right',
      flex: 1,
    },
    '& th': {
      color: 'grey',
    },
    '& td': {
      color: 'white',
      fontFamily: 'Roboto Mono, Roboto, Ubuntu',
    },
  },
  [theme.breakpoints.down('sm')]: {
    orderbook: {
      flexWrap: 'wrap-reverse',
    },
    bidsBody: {
      display: 'flex',
      flexDirection: 'column-reverse',
    },
    aksBody: {
      marginTop: 30,
    },
  },
}));

interface OrderRowProps {
  color: string;
  direction: string;
  price: number;
  size: number;
  total: number;
  width: string;
}

const OrderRow: React.FC<OrderRowProps> = memo(
  ({ color, direction, price, size, total, width }) => {
    const backgroundColor = color.replace(')', ', 0.2)');
    return (
      <TableRow
        style={{
          background: `linear-gradient(to ${direction}, ${backgroundColor} ${width}, transparent ${width})`,
          ...(direction === 'left' && { flexDirection: 'row-reverse' }),
        }}>
        <TableCell style={{ color }}>
          {price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </TableCell>
        <TableCell>{size.toLocaleString()}</TableCell>
        <TableCell>{total.toLocaleString()}</TableCell>
      </TableRow>
    );
  },
);

interface TableHeaderProps {
  cells?: React.ReactElement | React.ReactElement[];
}

const TableHeader: React.FC<TableHeaderProps> = memo(({ cells }) => (
  <TableHead>
    <TableRow>
      {cells ?? (
        <>
          <TableCell>TOTAL</TableCell>
          <TableCell>SIZE</TableCell>
          <TableCell>PRICE</TableCell>
        </>
      )}
    </TableRow>
  </TableHead>
));

interface PresentationalProps {
  highestBids: OrderLevel[];
  lowestAsks: OrderLevel[];
  totalOrderSize: number;
  width: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const OrderBookPresentational: React.FC<PresentationalProps> = memo(
  ({ highestBids, lowestAsks, totalOrderSize, width }) => {
    const classes = useStyles();
    const viewMobile = isWidthDown('sm', width);
    return (
      <Container className={classes.orderbook}>
        <Table className={classes.table} aria-label="asks table">
          {!viewMobile && <TableHeader />}
          <TableBody className={classes.aksBody}>
            {lowestAsks.map(({ price, size, total }) => (
              <OrderRow
                key={`${OrderType.ASKS}-${price}`}
                color="rgb(185, 29, 28)"
                direction="left"
                price={price}
                size={size}
                width={`${(total * 100) / totalOrderSize}%`}
                total={total}
              />
            ))}
          </TableBody>
        </Table>
        <Table className={classes.table} aria-label="bids table">
          <TableHeader
            cells={
              !viewMobile ? (
                <>
                  <TableCell>PRICE</TableCell>
                  <TableCell>SIZE</TableCell>
                  <TableCell>TOTAL</TableCell>
                </>
              ) : undefined
            }
          />
          <TableBody className={classes.bidsBody}>
            {highestBids.map(({ price, size, total }) => (
              <OrderRow
                key={`${OrderType.BIDS}-${price}`}
                color="rgb(11, 160, 114)"
                direction={viewMobile ? 'left' : 'right'}
                price={price}
                size={size}
                width={`${(total * 100) / totalOrderSize}%`}
                total={total}
              />
            ))}
          </TableBody>
        </Table>
      </Container>
    );
  },
);

export default withWidth()(OrderBookPresentational);
