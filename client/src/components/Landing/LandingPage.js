import React,{Fragment} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProductHero from "./ProductHero";
import ProductValues from "./ProductValues";
import ProductHowItWorks from "./ProductHowItWorks";

const LandingPage = ({isAuthenticated}) => {
    if(isAuthenticated){
        return <Redirect to={'dashboard'}/>
    }

    return (
        <Fragment>
            <ProductHero/>
            <ProductValues/>
            <ProductHowItWorks/>
        </Fragment>
    );
};

LandingPage.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(LandingPage);