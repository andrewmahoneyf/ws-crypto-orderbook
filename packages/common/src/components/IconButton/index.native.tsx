import React from 'react';
import {
  NativeSyntheticEvent,
  NativeTouchEvent,
  ViewStyle,
} from 'react-native';
import { Button as NativeButton } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ButtonProps {
  iconName: string;
  onClick: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  style: ViewStyle;
  title: string;
}

const IconButton: React.FC<ButtonProps> = ({
  iconName,
  onClick,
  style,
  title,
}) => (
  <NativeButton
    accessibilityLabel={`${title} button`}
    icon={<Icon name={iconName.replace('_', '-')} size={15} color="white" />}
    buttonStyle={{ ...style, margin: 5 }}
    onPress={onClick}
    title={title}
  />
);

export default IconButton;
