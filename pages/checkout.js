import React from 'react'
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material'
const PREFIX = 'checkout';

const classes = {
  main: `${PREFIX}-main`
};

const StyledContainer = styled(Container)((
  {
    theme
  }
) => ({
  [`& .${classes.main}`]: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    margin: theme.spacing(10, 0, 0, 0),
  }
}));

export default function Checkout() {


  return (
    <StyledContainer maxWidth="lg">
      <div className={classes.main}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Coming soon!
        </Typography>
      </div>
    </StyledContainer>
  );
}
