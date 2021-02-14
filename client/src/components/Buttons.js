import Button from '@material-ui/core/Button';
import React from 'react';

export const CustomButton = ({ classField, text, onClick }) => {
  return (
    <Button variant='outlined' className={classField} onClick={onClick}>
      {text}
    </Button>
  );
};

