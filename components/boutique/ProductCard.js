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
import Fade from '@material-ui/core/Fade';

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
    buttonsContainerParent: {
        width: '100%',
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
        [theme.breakpoints.between('xs', 'sm')]: {
            position: 'static',
            backgroundColor: 'white',
            flexDirection: 'row',
            width: '100%',
        },
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
        [theme.breakpoints.between('xs', 'sm')]: {
            marginBottom: 0,
        },
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
    const {classes, product, isTabletOrBelow} = props
    const context = useContext(GlobalContext);
    const { addProductToCart, addProductToWishlist, pushObject, findById, wishlist } = context;
    const [isDisplayed, setIsDisplayed] = useState(false);   

    const handleAddToCart = (e, product) => {
        addProductToCart(product, pushObject('open_interstitial', true))
    }
    
    const handleAddToWishlist = (product) => {
        addProductToWishlist(product);
    }

    const handleHover = (dispayValue) => {
        if (!isTabletOrBelow) {
            setIsDisplayed(dispayValue);
        }
    }

    const productInWishlist = findById(product.id, wishlist);

    const renderButtons = (product) => {
        return (
            <CardActions className={classes.buttonsContainer}>
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
        );
    }

    return (
        <Card className={classes.root} onMouseOver={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
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
            {!isTabletOrBelow
                ? <Fade in={isDisplayed} timeout={300}>{renderButtons(product)}</Fade> 
                : <CardActions className={classes.buttonsContainerParent}>{renderButtons(product)}</CardActions>
            }
        </Card>
    )
}

export default withStyles(useStyles)(ProductCard)