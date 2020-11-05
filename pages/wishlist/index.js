import { withStyles, Container, Grid, Typography } from '@material-ui/core';
import DefaultLayout from '../../components/DefaultLayout';
import ProductWishlist from '../../components/wishlist/ProductWishlist';

const useStyles = (theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  h1: {
    margin: theme.spacing(5, 0)
  },

})

const Wishlist = (props) => {
  const { classes } = props;

  return (
    <DefaultLayout>
      <Container maxWidth="lg" className={classes.root}>
        <Grid container justify={'center'}>
          <Grid item>
            <Typography variant="h3" component="h1" className={classes.h1}>Wishlist</Typography>
          </Grid>
        </Grid>

        <Grid>
          <ProductWishlist />
        </Grid>
      </Container>
    </DefaultLayout>
  );

}

export default withStyles(useStyles)(Wishlist);