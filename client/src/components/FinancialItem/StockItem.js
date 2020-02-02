import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../Layout/Spinner'
import Plot from 'react-plotly.js';

const StockItem = ({stock: {loading, stock}}) =>{

    //fixme: implement https://plot.ly/javascript/candlestick-charts/

    return (loading && stock === null) ? (
        <Spinner/>
    ) : (
        <div>
            <Plot
                data={[
                    {
                        x: stock.stockChartXValues,
                        y: stock.stockChartYValues,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    }
                ]}
                layout={{width: 720, height: 440, title: stock.stockName}}
                options ={ {displaylogo: 'false'} }
            />
        </div>
    );
};


StockItem.propTypes = {
    stock: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    stock: state.stock
})

export default
connect(mapStateToProps)(StockItem);
