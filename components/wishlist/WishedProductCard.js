import { useContext, useState, useCallback } from 'react';
import { Cart } from './../../store/cart';
import { Wishlist } from './../../store/wishlist';
import { Card, Typography, Divider, withStyles, CardMedia, Container, IconButton, CardActions } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ProductDetailsView from './ProductDetailsView';

const useStyles = (theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    [theme.breakpoints.between('xs', 'sm')]: {
      flexDirection: 'column',
    },
  },
  imageContainer: {
    width: "100px",
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '200px',
      marginBottom: theme.spacing(2),
    },
  },
  image: {
    width: "100%",
  },
  buttonsContainer: {
    display: 'flex',
  }
});

const WishedProductCard = (props) => {
  const wishlistContext = useContext(Wishlist.State);
  const cartDispatch = useContext(Cart.Dispatch);
  const [open, setOpen] = useState(false);

  const { removeProductFromWishlist } = wishlistContext;
  const { addProductToCart, pushObject} = cartDispatch;
  const { classes, product } = props;

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleRemoveFromWishlist = (id) => () => {
    removeProductFromWishlist(id);
  }

  const handelAddToCart = (product) => () => {
    addProductToCart(product, pushObject('open_interstitial', true))
  }
  
  const handleViewProductDetails = () => {
    setOpen(true);
  }
  
  return (
    <Card className={classes.root}>
      <Container className={classes.imageContainer}>
        <CardMedia
          component="img"
          alt={product.title}
          image={product.image}
          className={classes.image}
        />
      </Container>
      <Container>
        <Typography variant="h6" component="h3">{product.title}</Typography>
        <Typography>{product.price} $</Typography>
      </Container>
      <Divider orientation="vertical" flexItem />
      <CardActions className={classes.buttonsContainer}>
        <IconButton onClick={handelAddToCart(product)}>
          <ShoppingBasketIcon />
        </IconButton>
        <IconButton onClick={() => handleViewProductDetails()}>
            <VisibilityIcon />
        </IconButton>
        <IconButton onClick={handleRemoveFromWishlist(product.id)} >
            <DeleteIcon />
        </IconButton>        
      </CardActions>
      <ProductDetailsView open={open} product={product} handleClose={handleClose}/>
    </Card>
  );
}

export default withStyles(useStyles)(WishedProductCard);