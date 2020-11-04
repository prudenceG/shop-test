import '../styles/globals.css'
import { Wishlist } from './../store/wishlist';
import { Cart } from './../store/cart';
import { TransitionAlert } from '../store/transitionAlert';

function MyApp({ Component, pageProps }) {
  return (
    <Cart.Provider>
      <Wishlist.Provider>
        <TransitionAlert.Provider>
          <Component {...pageProps} />
        </TransitionAlert.Provider>
      </Wishlist.Provider>
    </Cart.Provider>
    )
}

// It is possible to combine providers by creating a Store
// Example of code available in ./state/index.js

// _app.js
// import { Store } from './../state/index';

// function MyApp({ Component, pageProps }) {
//   return (
//     <Store>
//       <Component {...pageProps} />
//     </Store>
//     )
// }

export default MyApp
