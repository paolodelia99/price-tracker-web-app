import React from 'react';
import StockItem from '../FinancialItem/StockItem';
import ForexItem from "../FinancialItem/ForexItem";
import CryptoItem from "../FinancialItem/CryptoItem";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const SelectedItem = ({stock:{stock},forex:{forex},crypto:{crypto}}) => {
    return (
        <div className='selected-item-wrapper'>
            {stock !== null ? (<StockItem/>) : null}
            {forex !== null ? (<ForexItem/>): null}
            {crypto !== null ? (<CryptoItem/>): null}
        </div>
    );
};

SelectedItem.protoTypes = {
    stock: PropTypes.object.isRequired,
    forex: PropTypes.object.isRequired,
    crypto: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    stock: state.stock,
    forex: state.forex,
    crypto: state.crypto
})

export default connect(mapStateToProps)(SelectedItem);