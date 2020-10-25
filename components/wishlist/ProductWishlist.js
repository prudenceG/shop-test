import { Grid } from '@material-ui/core';
import WishedProductCard from './WishedProductCard';

const ProductWishlist = ({wishlist}) => {
  return (
    <Grid container spacing={3} justify="center">
      {wishlist.map(product => (
        <Grid key={product.id} item xs={12} sm={9}>
          <WishedProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductWishlist;