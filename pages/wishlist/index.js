import React, { useContext } from 'react';
import { withStyles, Container, Grid, Typography } from '@material-ui/core';
import DefaultLayaout from '../../components/DefaultLayout';
import ProductWishlist from '../../components/wishlist/ProductWishlist';
import GlobalContext from '../../state/global-context';

const useStyles = (theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  h1: {
    margin: theme.spacing(5, 0)
  },

})

const Wishlist = (props) => {
  const context = useContext(GlobalContext)
  const { classes } = props;
  
  return (
    <DefaultLayaout>
      <Container maxWidth="lg" className={classes.root}>
        <Grid container justify={'center'}>
          <Grid item>
            <Typography variant="h3" component="h1" className={classes.h1}>Wishlist</Typography>
          </Grid>
        </Grid>

        <Grid>
          <ProductWishlist wishlist={context.wishlist} />
        </Grid>
      </Container>
    </DefaultLayaout>
  );

}

export default withStyles(useStyles)(Wishlist);