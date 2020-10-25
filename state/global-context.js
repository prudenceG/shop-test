const GlobalContext = createContext();
import { createContext, Component } from 'react';
import { wishlistSuccessAlert, wishlistInfoAlert } from './../components/transitionAlert/TransitionAlert';
import PropTypes from 'prop-types';

export class GlobalProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transitionAlert: {
                isOpen: false,
            },
            open_interstitial: false,
            cart: [],
            pushObject: this.pushObject.bind(this),
            getCart: this.getCart.bind(this),
            addProductToCart: this.addProductToCart.bind(this),
            removeProductToCart: this.removeProductToCart.bind(this),
            wishlist: [],
            getWishlist: this.getWishlist.bind(this),
            addProductToWishlist: this.addProductToWishlist.bind(this),
            removeProductFromWishlist: this.removeProductFromWishlist.bind(this),
            findById: this.findbyId.bind(this),
            updateTransitionAlert: this.updateTransitionAlert.bind(this),
        }
    }

    pushObject(key, value, callback) {
        this.setState({ [key]: value }, callback);
    }

    getCart() {
        const sessionStorageCart = JSON.parse(sessionStorage.getItem('cart')); // null if not exist

        if (sessionStorageCart !== null) {
            this.setState({ cart: sessionStorageCart });
        }else {
            this.setState({ cart: [] });
        }
    }

    addProductToCart(product, callback) {
        const newCart = [...this.state.cart]
        newCart.push(product)
        this.setState({ cart: newCart }, () => {
            sessionStorage.setItem('cart', JSON.stringify(newCart));

            if (typeof callback !== 'undefined') callback();
        });
    }

    removeProductToCart(id, callback) {
        const newCart = [...this.state.cart]
        const ProductIndex = newCart.indexOf(p =>{
            p.id === id
        });
        newCart.splice(ProductIndex, 1)
        this.setState({ cart: newCart }, () => {
            sessionStorage.setItem('cart', JSON.stringify(newCart));

            if (typeof callback !== 'undefined') callback();
        });
    }

    findbyId(id, array) {
        return array.find(element => element.id === id);
    }

    updateTransitionAlert(values) {
        this.setState({
            transitionAlert: {
                ...this.state.transitionAlert,
                ...values
            },
        })
    }

    getWishlist() {
        const wishlist = JSON.parse(sessionStorage.getItem('wishlist'));

        if (wishlist) this.setState({wishlist})
    }

    addProductToWishlist(product) {
        const productFinded = this.findbyId(product.id, this.state.wishlist);
       
        if (!productFinded) {
            const newWishlist = [...this.state.wishlist, product];
            this.setState({wishlist: newWishlist}, () => sessionStorage.setItem('wishlist', JSON.stringify(newWishlist)));
            this.updateTransitionAlert(wishlistSuccessAlert);
            
            return;
        }

        this.updateTransitionAlert(wishlistInfoAlert);
    }
    
    removeProductFromWishlist(id) {
        const newWishlist = this.state.wishlist.filter(product => product.id !== id);
        this.setState({wishlist: newWishlist}, () => sessionStorage.setItem('wishlist', JSON.stringify(newWishlist)));
    }

    componentDidMount() {
        this.getCart()
        this.getWishlist();
    }

    render() {
        const { children } = this.props;
        
        return (
            <GlobalContext.Provider value={{ ...this.state }}>
                {children}
            </GlobalContext.Provider>
        );
    }
}

GlobalProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default GlobalContext;
