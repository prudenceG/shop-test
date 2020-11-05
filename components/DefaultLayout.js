import Header from './header/Header'
import Footer from './footer/Footer'
import { ThemeProvider} from "@material-ui/styles"
import { withStyles } from '@material-ui/core'
import { CssBaseline } from '@material-ui/core';
import theme from '../theme/theme';

// ===== Basic Layout ===== //
const useStyles = () => ({
    root: {
        minHeight: "100vh",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
});

const DefaultLayout = (props) => {
    const {classes} = props;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className={classes.root}>
                <div>
                    {/*Header*/}
                    <Header/>

                    <main>
                        {props.children}
                    </main>
                </div>

                {/*Footer*/}
                <Footer/>
            </div>
        </ThemeProvider>
    )
}

export default withStyles(useStyles)(DefaultLayout)