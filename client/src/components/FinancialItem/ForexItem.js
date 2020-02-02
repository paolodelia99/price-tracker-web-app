import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from "../Layout/Spinner";
import Plot from 'react-plotly.js';

const ForexItem = ({forex: {forex,loading}}) => {

    return loading && forex === null ? (
        <Spinner/>
    ) : (
        <div>
            <Plot
                data={[
                    {
                        x: forex.forexChartXValues,
                        y: forex.forexChartYValues,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'green'},
                    }
                ]}
                layout={{width: 720, height: 440, title: forex.forexName}}
            />
        </div>
    );
};

ForexItem.propTypes = {
    forex: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    forex: state.forex
})

export default
connect(
    mapStateToProps
)(ForexItem);
