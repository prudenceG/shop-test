import { useContext, useEffect } from 'react';
import GlobalContext from '../../state/global-context';
import ProductCard from './ProductCard'
import TransitionAlert from './../transitionAlert/TransitionAlert';
import { Grid, useTheme } from "@material-ui/core";
import useMediaQuery from '@material-ui/core/useMediaQuery';


const ProductList = (props) => {
    const context = useContext(GlobalContext);
    const {updateTransitionAlert, transitionAlert} = context;
    const {products} = props;
    const theme = useTheme();
    const isTabletOrBelow = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

    useEffect(() => {
        return () => updateTransitionAlert({isOpen: false});
    }, [])
    
    return (
        <>
        {transitionAlert.isOpen && <TransitionAlert />}
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
