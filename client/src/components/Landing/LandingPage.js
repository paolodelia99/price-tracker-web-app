import React,{Fragment} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/styles';
import ProductHero from "./ProductHero";
import ProductValues from "./ProductValues";
import ProductHowItWorks from "./ProductHowItWorks";
import {landingTheme} from '../styles/landingTheme';
import AppNavbar from '../Layout/AppNavbar'

const LandingPage = ({isAuthenticated}) => {
    if(isAuthenticated){
        return <Redirect to={'dashboard'}/>
    }

    return (
        <ThemeProvider theme={landingTheme}>
            <section className="landing-page">
                <AppNavbar/>
                <ProductHero/>
                <ProductValues/>
                <ProductHowItWorks/>
            </section>
        </ThemeProvider>
    );
};

LandingPage.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(LandingPage);
