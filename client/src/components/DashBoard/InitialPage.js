import React,{Fragment} from 'react';
import PropTypes from 'prop-types';
//Material UI imports
import Container from "@material-ui/core/Container";
import {initialPageStyle} from '../styles/initialPageStyle';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
//Redux
import { connect } from 'react-redux'


const InitialPage =
    ({
         auth:{user},
         profile :{profile,loading,stocks,forex,crypto}
    }) => {
    const classes = initialPageStyle();

    return (
        <Fragment>
            <Container maxWidth='lg' className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item md={12} spacing={2}>
                        <Typography variant='h4' align='center' className={classes.text}>
                            Welcome {user && user.firstName}
                        </Typography>
                        <Typography variant='h5' align='center' className={classes.text}>
                            Take a look to this:
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    );
};

InitialPage.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps)(InitialPage);
