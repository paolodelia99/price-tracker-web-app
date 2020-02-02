import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from "../Layout/Spinner";
import Plot from 'react-plotly.js';

const CryptoItem = ({crypto: {crypto,loading}}) => {

    return loading && crypto === null ? (
        <Spinner/>
    ) : (
        <div>
            <Plot
                data={[
                    {
                        x: crypto.cryptoChartXValues,
                        y: crypto.cryptoChartYValues,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'blue'},
                    }
                ]}
                layout={{width: 720, height: 440, title: crypto.cryptoName}}
            />
        </div>
    );
};

CryptoItem.protoTypes = {
    crypto: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    crypto: state.crypto
})

export default
connect(
    mapStateToProps
)(CryptoItem);