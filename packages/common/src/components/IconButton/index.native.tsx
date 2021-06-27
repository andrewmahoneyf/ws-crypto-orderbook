import React from 'react';
import { NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
import { Button as NativeButton, Icon } from 'react-native-elements';

interface ButtonProps {
  iconName: string;
  onClick: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  title: string;
}

const IconButton: React.FC<ButtonProps> = ({
  iconName,
  onClick,
  title,
}): JSX.Element => {
  return (
    <NativeButton
      accessibilityLabel={`${title} button`}
      icon={<Icon name={iconName} type="material" size={15} color="white" />}
      onPress={onClick}
      title={title}
    />
  );
};

export default IconButton;
