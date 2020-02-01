import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import costumTypography from '../layout/costumTypography';
import {productValuesStyle} from '../styles/productValuesStyle'

function ProductValues(props) {
    const classes = productValuesStyle();
    return (
        <section className={classes.root}>
            <Container className={classes.container}>
                <img
                    src="/static/themes/onepirate/productCurvyLines.png"
                    className={classes.curvyLines}
                    alt="curvy lines"
                />
                <Grid container spacing={5}>
                    <Grid item xs={12} md={4}>
                        <div className={classes.item}>
                            <img
                                className={classes.image}
                                src="/static/themes/onepirate/productValues1.svg"
                                alt="suitcase"
                            />
                            <costumTypography variant="h6" className={classes.title}>
                                The best luxury hotels
                            </costumTypography>
                            <costumTypography variant="h5">
                                {'From the latest trendy boutique hotel to the iconic palace with XXL pool'}
                                {', go for a mini-vacation just a few subway stops away from your home.'}
                            </costumTypography>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div className={classes.item}>
                            <img
                                className={classes.image}
                                src="/static/themes/onepirate/productValues2.svg"
                                alt="graph"
                            />
                            <costumTypography variant="h6" className={classes.title}>
                                New experiences
                            </costumTypography>
                            <costumTypography variant="h5">
                                {'Privatize a pool, take a Japanese bath or wake up in 900m2 of garden… '}
                                {'your Sundays will not be alike.'}
                            </costumTypography>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div className={classes.item}>
                            <img
                                className={classes.image}
                                src="/static/themes/onepirate/productValues3.svg"
                                alt="clock"
                            />
                            <costumTypography variant="h6" className={classes.title}>
                                Exclusive rates
                            </costumTypography>
                            <costumTypography variant="h5">
                                {'By registering, you will access specially negotiated rates '}
                                {'that you will not find anywhere else.'}
                            </costumTypography>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
}

ProductValues.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default ProductValues;