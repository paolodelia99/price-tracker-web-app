import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import {productHeroLayoutStyle} from '../styles/productHeroLayoutStyle';
import Icon from '@material-ui/core/Icon';

function ProductHeroLayout(props) {
    const classes = productHeroLayoutStyle();
    const { backgroundClassName, children} = props;

    return (
        <section className={classes.root}>
            <Container className={classes.container}>
                {children}
                <div className={classes.backdrop} />
                <div className={clsx(classes.background, backgroundClassName)} />
                <Icon>arrow_downward</Icon>
            </Container>
        </section>
    );
}

ProductHeroLayout.propTypes = {
    backgroundClassName: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default ProductHeroLayout;