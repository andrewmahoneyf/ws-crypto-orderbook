/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { App as OrderBookApp } from 'common';

const App = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <View
      style={{
        backgroundColor: isDarkMode ? Colors.black : Colors.white,
      }}>
      <OrderBookApp />
    </View>
  );
};

export default App;
