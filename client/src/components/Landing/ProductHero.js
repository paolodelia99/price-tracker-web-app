import React from 'react';
import {Link} from 'react-router-dom';
import Button from '../layout/custumButton';
import costumTypography from '../layout/costumTypography';
import ProductHeroLayout from './ProductHeroLayout';
import {productHeroStyle} from "../styles/productHeroStyle";
import FintechImg from '../../resources/fintech.jpg'

function ProductHero(props) {
    const classes = productHeroStyle();

    return (
        <ProductHeroLayout backgroundClassName={classes.background}>
            {/* Increase the network loading priority of the background image. */}
            <img style={{ display: 'none' }} src={FintechImg} alt="increase priority" />
            <costumTypography color="inherit" align="center" variant="h2" marked="center">
                Track Your Favourites Stock
            </costumTypography>
            <costumTypography color="inherit" align="center" variant="h5" className={classes.h5}>
                testo da inserire
            </costumTypography>
            <Link to='/register'>
                <Button
                    color="secondary"
                    variant="contained"
                    size="large"
                    className={classes.button}
                    component="a"
                >
                    Register
                </Button>
            </Link>
            <costumTypography variant="body2" color="inherit" className={classes.more}>
                Discover the experience
            </costumTypography>
        </ProductHeroLayout>
    );
}

export default ProductHero;