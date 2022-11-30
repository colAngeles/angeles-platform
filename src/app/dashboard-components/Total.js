import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Total({ data }) {
  return (
    <React.Fragment>
      <Title>Total De Usuarios</Title>
      <Typography component="p" variant="h4">
        {data.amountUsers}
      </Typography>
      <Typography  sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
    </React.Fragment>
  );
}
