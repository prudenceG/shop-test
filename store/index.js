// Example of code to combine several provider instead of encapsulate each of them in _app.js

import React, { cloneElement } from 'react'
import { Wishlist } from './wishlist';
import { Cart } from './cart';

const providers = [<Cart.Provider />, <Wishlist.Provider />]

const Store = ({ children: initial }) =>
  providers.reduce((children, parent) => cloneElement(parent, { children }), initial)

export { Store, Wishlist, Cart };
// It's very interesting to export the store and ALL providers. It's more easy to import them after inside
// pages or components from only one file index.js :)