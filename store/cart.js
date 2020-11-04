import { createContext, Component } from 'react';
import PropTypes from 'prop-types';

const State = createContext();
const Dispatch = createContext();

class Provider extends Component {
    state = {
        open_interstitial: false,
        cart: [],
    }

    dispatch = {
        getCart: this.getCart.bind(this),
        pushObject: this.pushObject.bind(this),
        addProductToCart: this.addProductToCart.bind(this),
        removeProductToCart: this.removeProductToCart.bind(this),
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

    componentDidMount() {
        this.getCart()
    }

    render() {
        const { children } = this.props;
        
        return (
            <State.Provider value={this.state}>
                <Dispatch.Provider value={this.dispatch}>
                    {children}
                </Dispatch.Provider>
            </State.Provider>
        );
    }
}

Provider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const Cart = {
    State,
    Provider,
    Dispatch,
};
