import React from 'react';
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '../layout/custumButton';
import costumTypography from '../layout/costumTypography';
import {productHeroLayoutStyle} from '../styles/productHowItWorksStyle'

function ProductHowItWorks(props) {
    const classes  = productHeroLayoutStyle();

    return (
        <section className={classes.root}>
            <Container className={classes.container}>
                <img
                    src="/static/themes/onepirate/productCurvyLines.png"
                    className={classes.curvyLines}
                    alt="curvy lines"
                />
                <costumTypography variant="h4" marked="center" className={classes.title} component="h2">
                    How it works
                </costumTypography>
                <div>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={4}>
                            <div className={classes.item}>
                                <div className={classes.number}>1.</div>
                                <img
                                    src="/static/themes/onepirate/productHowItWorks1.svg"
                                    alt="suitcase"
                                    className={classes.image}
                                />
                                <costumTypography variant="h5" align="center">
                                    Appointment every Wednesday 9am.
                                </costumTypography>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <div className={classes.item}>
                                <div className={classes.number}>2.</div>
                                <img
                                    src="/static/themes/onepirate/productHowItWorks2.svg"
                                    alt="graph"
                                    className={classes.image}
                                />
                                <costumTypography variant="h5" align="center">
                                    First come, first served. Our offers are in limited quantities, so be quick.
                                </costumTypography>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <div className={classes.item}>
                                <div className={classes.number}>3.</div>
                                <img
                                    src="/static/themes/onepirate/productHowItWorks3.svg"
                                    alt="clock"
                                    className={classes.image}
                                />
                                <costumTypography variant="h5" align="center">
                                    {'New offers every week. New experiences, new surprises. '}
                                    {'Your Sundays will no longer be alike.'}
                                </costumTypography>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <Button
                    color="secondary"
                    size="large"
                    variant="contained"
                    className={classes.button}
                    component="a"
                    href="/premium-themes/onepirate/sign-up/"
                >
                    Get started
                </Button>
            </Container>
        </section>
    );
}

export default ProductHowItWorks;