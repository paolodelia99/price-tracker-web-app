import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {productHeroLayoutStyle} from '../styles/productHowItWorksStyle';
// Icon
import { Icon, InlineIcon } from '@iconify/react';
import fileFind from '@iconify/icons-mdi/file-find';
import cardsHeart from '@iconify/icons-mdi/cards-heart';
import updateIcon from '@iconify/icons-mdi/update';

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
                <Typography marked="center" className={classes.title} component="h2">
                    How it works
                </Typography>
                <div>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={4}>
                            <div className={classes.item}>
                                <div className={classes.number}>1.</div>
                                <Icon icon={fileFind} width="50px" height="50px"/>
                                <Typography variant="h5" align="center" className={classes.text}>
                                    Pick a financial instrument
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <div className={classes.item}>
                                <div className={classes.number}>2.</div>
                                <Icon icon={cardsHeart} width="50px" height="50px"/>
                                <Typography variant="h5" align="center" className={classes.text}>
                                    Add to the favourites
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <div className={classes.item}>
                                <div className={classes.number}>3.</div>
                                <Icon icon={updateIcon} width="50px" height="50px"/>
                                <Typography variant="h5" align="center" className={classes.text}>
                                    {'Stay updated on the price'}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                >
                    Get started
                </Button>
            </Container>
        </section>
    );
}

export default ProductHowItWorks;