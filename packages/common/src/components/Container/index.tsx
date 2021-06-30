import React from 'react';

interface ContainerProps {
  children: React.ReactElement | React.ReactElement[];
  className?: string;
  style?: React.CSSProperties;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  style,
}) => (
  <div className={className} style={style}>
    {children}
  </div>
);

export default Container;
