import { useContext, useEffect } from 'react';
import { TransitionAlert as TransitionAlertContext } from './../../store/transitionAlert';
import ProductCard from './ProductCard'
import TransitionAlert from './../transitionAlert/TransitionAlert';
import { Grid, useTheme } from "@material-ui/core";
import useMediaQuery from '@material-ui/core/useMediaQuery';


const ProductList = (props) => {
    const transitionAlertState = useContext(TransitionAlertContext.State);
    const transitionAlertDispatch = useContext(TransitionAlertContext.Dispatch);
    const theme = useTheme();
    const isTabletOrBelow = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
    
    const { isOpen } = transitionAlertState;
    const { updateTransitionAlert } = transitionAlertDispatch;
    const { products } = props;

    useEffect(() => {
        return () => updateTransitionAlert({isOpen: false});
    }, [])
    
    return (
        <>
        {isOpen && <TransitionAlert />}
        <Grid container spacing={2}>
            {products.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <ProductCard product={product} isTabletOrBelow={isTabletOrBelow} />
                </Grid>
            ))}
        </Grid>
        </>
    )
}

export default ProductList;
