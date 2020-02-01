import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from "@material-ui/core";
import ProductHeroLayout from './ProductHeroLayout';
import {productHeroStyle} from "../styles/productHeroStyle";
import FintechImg from '../../resources/fintech.jpg';
import Typography from "@material-ui/core/Typography";

function ProductHero(props) {
    const classes = productHeroStyle();

    return (
        <ProductHeroLayout backgroundClassName={classes.background}>
            {/* Increase the network loading priority of the background image. */}
            <img style={{ display: 'none' }} src={FintechImg} alt="increase priority" />
            <Typography color="inherit" align="center"  marked="center">
                Track Your Favourites Stock
            </Typography>
            <Typography color="inherit" align="center" className={classes.h5}>
                testo da inserire
            </Typography>
            <Link to='/register'>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                >
                    Register
                </Button>
            </Link>
            <Typography variant="body2" color="inherit" className={classes.more}>
                Discover the experience
            </Typography>
        </ProductHeroLayout>
    );
}

export default ProductHero;