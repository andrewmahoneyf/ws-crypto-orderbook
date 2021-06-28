import React from 'react';

interface ContainerProps {
  children: React.ReactElement | React.ReactElement[];
  style?: React.CSSProperties;
}

const Container: React.FC<ContainerProps> = ({ children, style }) => {
  return <div style={style}>{children}</div>;
};

export default Container;
