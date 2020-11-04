import React, { createContext, Component } from 'react';

export const State = createContext();

class Provider extends Component {
  state = {
    wishlist: [],
    getWishlist: this.getWishlist.bind(this),
    addProductToWishlist: this.addProductToWishlist.bind(this),
    removeProductFromWishlist: this.removeProductFromWishlist.bind(this),
    findById: this.findbyId.bind(this),
  };

  componentDidMount() {
    this.getWishlist();
  }

  findbyId(id, array) {
    return array.find(element => element.id === id);
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
        
        return true;
    }

    return false;
  }

  removeProductFromWishlist(id) {
    const newWishlist = this.state.wishlist.filter(product => product.id !== id);
    this.setState({wishlist: newWishlist}, () => sessionStorage.setItem('wishlist', JSON.stringify(newWishlist)));
  }

  render() {
    return (
      <State.Provider value={this.state}>
        {this.props.children}
      </State.Provider>
    );
  }
}

export const Wishlist = {
  Provider,
  State
}