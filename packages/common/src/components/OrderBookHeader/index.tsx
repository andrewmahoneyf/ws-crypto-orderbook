import React from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setGrouping } from '../../state/orderbookSlice';
import {
  selectOrderbookGroup,
  selectOrderbookPair,
} from '../../state/selectors';
import { GROUP_OPTIONS } from '../../constants/orderBook';

const StyledInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '& svg': {
        color: 'white',
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: '#3e444e',
      color: 'white',
      fontSize: 16,
      padding: '5px 26px 5px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        backgroundColor: '#3e444e',
      },
    },
  }),
)(InputBase);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: '#121726',
      color: 'white',
      padding: '0 48px 0 16px',
    },
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

const OrderBookHeader = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const grouping = useAppSelector(selectOrderbookGroup);
  const selectedPair = useAppSelector(selectOrderbookPair);
  const options = GROUP_OPTIONS[selectedPair];

  const handleChange = (event: React.ChangeEvent<{ value: string }>) =>
    dispatch(setGrouping(parseFloat(event.target.value)));

  return (
    <div className={classes.header}>
      <Typography variant="subtitle1">Order Book</Typography>
      <FormControl className={classes.margin}>
        <NativeSelect
          value={grouping}
          onChange={handleChange}
          input={<StyledInput />}>
          {options.map(opt => (
            <option key={opt} value={opt}>
              Group {opt}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default OrderBookHeader;
