import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

interface ButtonProps {
  iconName: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  title: string;
}

const IconButton: React.FC<ButtonProps> = ({
  iconName,
  onClick,
  title,
}): JSX.Element => {
  const classes = useStyles();
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
