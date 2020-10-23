import {
    Card,
    CardContent,
    CardActions,
    CardMedia,
    Typography,
    Button,
    withStyles,
} from '@material-ui/core'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import FavoriteIcon from '@material-ui/icons/Favorite';

import {useContext, useState} from "react";
import GlobalContext from "../../state/global-context";

const useStyles = theme => ({
    root: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        position: 'relative',
    },
    buttonsContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0, 
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',

    },
    favoriteIcon: {
        color: theme.palette.favorite,
    },
    wishlistButton: {
        backgroundColor: theme.palette.primary.wishlist,
        '&:hover': {
            backgroundColor: theme.palette.secondary.wishlist, 
        },
        marginBottom: 20,
        width: "80%",
    },
    cartButton: {
        backgroundColor: theme.palette.primary.main,
        color: "white",
        '&:hover': {
            backgroundColor: theme.palette.secondary.main, 
        },
        width: "80%",
    },
    content: {
        width: "100%",
    },
    thumbnailContainer: {
        padding: theme.spacing(2),
        textAlign: "center",
    },
    thumbnail: {
        maxHeight: '170px',
        width: "auto",
        margin: "auto",
    },
    name: {
        fontSize: '1rem',
    }
});

const ProductCard = (props) => {
    const {classes, product} = props
    const context = useContext(GlobalContext);
    const { addProductToCart, addProductToWishlist, pushObject, findById, wishlist } = context;
    const [isDisplayed, setIsDisplayed] = useState('none');

    const wishlistCtaStyles = {
        display: isDisplayed,
    }

    const handleAddToCart = (e, product) => {
        addProductToCart(product, pushObject('open_interstitial', true))
    }
    
    const handleAddToWishlist = (product) => {
        addProductToWishlist(product);
    }

    const handleHover = (dispayValue) => {
        setIsDisplayed(dispayValue);
    }

    const productInWishlist = findById(product.id, wishlist);

    return (
        <Card className={classes.root} onMouseOver={() => handleHover('flex')} onMouseLeave={() => handleHover('none')}>
            <CardContent className={classes.content}>
                {productInWishlist && <FavoriteIcon className={classes.favoriteIcon}/>}
                <div className={classes.thumbnailContainer}>
                    <CardMedia
                        component="img"
                        alt={product.title}
                        image={product.image}
                        className={classes.thumbnail}
                        title="Contemplative Reptile"
                    />
                </div>
                <Typography gutterBottom component="h2" className={classes.name}>
                    {product.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {product.desc}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {product.price}
                </Typography>
            </CardContent>
            <CardActions className={classes.buttonsContainer} style={wishlistCtaStyles}>
                <Button
                    variant="contained"
                    className={classes.wishlistButton}
                    size="large"
                    endIcon={<FavoriteIcon />}
                    onClick={() => handleAddToWishlist(product)}
                >
                    Save it
                </Button>
                <Button
                    variant="contained"
                    className={classes.cartButton}
                    size="large"
                    endIcon={<ShoppingBasketIcon />}
                    onClick={e => handleAddToCart(e, product)}
                >
                    Add it
                </Button>
            </CardActions>
        </Card>
    )
}

export default withStyles(useStyles)(ProductCard)