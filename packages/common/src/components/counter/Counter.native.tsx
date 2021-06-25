import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../hooks/react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from './counterSlice';

const Counter = (): JSX.Element => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <View>
      <View>
        <Button
          title="-"
          aria-label="Decrement value"
          onPress={() => dispatch(decrement())}
        />
        <Text>{count}</Text>
        <Button
          title="+"
          aria-label="Increment value"
          onPress={() => dispatch(increment())}
        />
      </View>
      <View>
        <TextInput
          aria-label="Set increment amount"
          onChangeText={setIncrementAmount}
          value={incrementAmount}
          keyboardType="numeric"
        />
        <Button
          title="Add Amount"
          onPress={() => dispatch(incrementByAmount(incrementValue))}
        />
        <Button
          title="Add Async"
          onPress={() => dispatch(incrementAsync(incrementValue))}
        />
        <Button
          title="Add If Odd"
          onPress={() => dispatch(incrementIfOdd(incrementValue))}
        />
      </View>
    </View>
  );
};

export default Counter;
