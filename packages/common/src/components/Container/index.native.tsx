import React from 'react';
import { View, ViewStyle } from 'react-native';

interface ContainerProps {
  children: React.ReactElement | React.ReactElement[];
  style: ViewStyle;
}

const Container: React.FC<ContainerProps> = ({ children, style }) => {
  return <View style={style}>{children}</View>;
};

export default Container;
