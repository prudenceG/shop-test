import { Dialog, Container, CardMedia, Typography, withStyles, useTheme, useMediaQuery, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = (theme) => ({
  imageContainer: {
    width: '400px',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  description: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  price: {
    marginBottom: theme.spacing(3),
  }
}) 

const ProductDetailsView = ({classes, open, product, handleClose}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog fullScreen={fullScreen} onClose={handleClose} open={open}>
      <IconButton onClick={handleClose}>
          <CloseIcon />
      </IconButton>
      <Container className={classes.imageContainer}>
        <CardMedia
          component="img"
          alt={product.title}
          image={product.image}
        />
      </Container>
      <Container>
        <Typography variant="h5" component="h3">{product.title}</Typography>
        <Typography variant="h6" component="h4" className={classes.description}>{product.description}</Typography>
        <Typography variant="h6" component="h4" className={classes.price}>{product.price} $</Typography>
      </Container>
    </Dialog>
  );
}

export default withStyles(useStyles)(ProductDetailsView);