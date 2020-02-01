import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import {productValuesStyle} from '../styles/productValuesStyle';
//Icon
import { Icon } from "@iconify/react";
import cashUsdOutline from '@iconify/icons-mdi/cash-usd-outline';
import bitcoinIcon from '@iconify/icons-mdi/bitcoin';
import financeIcon from '@iconify/icons-mdi/finance';


function ProductValues(props) {
    const classes = productValuesStyle();

    return (
        <section className={classes.root}>
            <Container className={classes.container}>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={4}>
                        <div className={classes.item}>
                            <Icon icon={financeIcon} width="50px" height="50px" />
                            <Typography className={classes.title}>
                                Stocks
                            </Typography>
                            <Typography >
                                {'From the latest trendy boutique hotel to the iconic palace with XXL pool'}
                                {', go for a mini-vacation just a few subway stops away from your home.'}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div className={classes.item}>
                            <Icon icon={cashUsdOutline} width="50px" height="50px"  />
                            <Typography className={classes.title}>
                                Forex exchanges
                            </Typography>
                            <Typography>
                                {'Privatize a pool, take a Japanese bath or wake up in 900m2 of garden… '}
                                {'your Sundays will not be alike.'}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div className={classes.item}>
                            <Icon icon={bitcoinIcon} width="50px" height="50px" />
                            <Typography className={classes.title}>
                                Cryptocurrencies
                            </Typography>
                            <Typography >
                                {'By registering, you will access specially negotiated rates '}
                                {'that you will not find anywhere else.'}
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
}

export default ProductValues;