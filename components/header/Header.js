import {withStyles, AppBar, Toolbar, Typography, IconButton, Container} from '@material-ui/core'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Link from 'next/link'
import Interstitial from '../Interstitial'
import {useContext} from "react";
import GlobalContext from "../../state/global-context";

const useStyles = theme => ({
    toolbar: {
        padding: 0,
        display: "flex",
        justifyContent: "space-between",
    },
    iconsContainer: {
        display: "flex",
        alignItems: "center",
    },
    iconButton: {
        position: "relative",
    },
    icon: {
        color: theme.palette.light,
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 40,
        position: "absolute",
        top: 10,
        right: 0,
        backgroundColor: theme.palette.primary.wishlist,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",

    },
    number: {
        margin: 0,
        fontWeight: "bold",
    },
});

const Header = props => {
    const {classes} = props
    const context = useContext(GlobalContext);

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        context.pushObject('open_interstitial', true);
    };

    const openWishlist = () => {
        context.getWishlist();
    }

    return (
        <>
        <header className={classes.root}>
            <AppBar position="static" elevation={0}>
                <Container maxWidth="lg">
                    <Toolbar className={classes.toolbar}>
                        <Link href="/" passHref>
                            <a>
                                <Typography variant="h4" className={classes.title}>
                                    SuperShop
                                </Typography>
                            </a>
                        </Link>
                        <div className={classes.iconsContainer}>
                            <IconButton onClick={toggleDrawer(!context.open_interstitial)}>
                                <ShoppingBasketIcon className={classes.icon}/>
                            </IconButton>
                            <>
                                <IconButton className={classes.iconButton} onClick={() => openWishlist()}>
                                    <FavoriteIcon className={classes.icon}/>
                                </IconButton>
                                <div className={classes.circle}>
                                    <Typography variant="caption" color="textPrimary" component="p" className={classes.number}>
                                        45
                                    </Typography>
                                </div>
                            </>
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
        </header>
        <Interstitial/>
        </>
    )
}

export default withStyles(useStyles)(Header)