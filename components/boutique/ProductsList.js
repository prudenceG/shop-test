import { useContext, useEffect } from 'react';
import GlobalContext from '../../state/global-context';
import ProductCard from './ProductCard'
import TransitionAlert from './../transitionAlert/TransitionAlert';
import { Grid } from "@material-ui/core";

const ProductList = (props) => {
    const context = useContext(GlobalContext);
    const {updateTransitionAlert, transitionAlert} = context;
    const {products} = props;

    useEffect(() => {
        return () => updateTransitionAlert({isOpen: false});
    }, [])
    
    return (
        <>
        {transitionAlert.isOpen && <TransitionAlert />}
        <Grid container spacing={2}>
            {products.map((product, index) => (
                <Grid item xs={6} md={4} key={index}>
                    <ProductCard product={product}/>
                </Grid>
            ))}
        </Grid>
        </>
    )
}

export default ProductList;
