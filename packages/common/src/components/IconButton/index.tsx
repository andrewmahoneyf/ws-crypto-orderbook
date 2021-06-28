import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    color: (props: React.CSSProperties) => props.color || 'white',
    backgroundColor: (props: React.CSSProperties) => props.backgroundColor,
  },
}));

interface ButtonProps {
  iconName: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  style: React.CSSProperties;
  title: string;
}

const IconButton: React.FC<ButtonProps> = ({
  iconName,
  onClick,
  style,
  title,
}) => {
  const classes = useStyles(style);
  return (
    <Button
      className={classes.button}
      onClick={onClick}
      startIcon={<Icon>{iconName}</Icon>}
      variant="contained">
      {title}
    </Button>
  );
};

export default IconButton;
