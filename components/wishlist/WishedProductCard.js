import { useContext, useState, useEffect } from 'react';
import { Card, Typography, Divider, withStyles, CardMedia, Container, IconButton, CardActions } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import GlobalContext from '../../state/global-context';
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

const WishedProductCard = ({classes, product}) => {
  const context = useContext(GlobalContext)
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(open);

    return () => {
      setOpen(false);
    }
  }, [open])

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveFromWishlist = (id) => () => {
    context.removeProductFromWishlist(id);
  }

  const handelAddToCart = (product) => () => {
    context.addProductToCart(product, context.pushObject('open_interstitial', true))
  }
  
  const handleViewProductDetails = () => () => {
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
        <IconButton onClick={handleViewProductDetails()}>
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