import '../styles/globals.css'
import { Wishlist } from './../store/wishlist';
import { Cart } from './../store/cart';
import { TransitionAlert } from '../store/transitionAlert';

function MyApp({ Component, pageProps }) {

  React.useEffect(() => {
    // Remove the server-side injected CSS to display CSS on reload CTRL+R
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

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
// Example of code available in ./store/index.js

// _app.js
// import { Store } from './../store/index';

// function MyApp({ Component, pageProps }) {
//   return (
//     <Store>
//       <Component {...pageProps} />
//     </Store>
//     )
// }

export default MyApp
