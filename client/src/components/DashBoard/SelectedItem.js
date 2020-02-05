import React, {useState} from 'react';
import StockItem from '../FinancialItem/StockItem';
import ForexItem from "../FinancialItem/ForexItem";
import CryptoItem from "../FinancialItem/CryptoItem";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from "../Layout/Spinner";
import Alert from "../Layout/Alert";

const SelectedItem =
    ({
         profile:{selectedItem},
         stock:{stock},
         forex:{forex},
         crypto:{crypto}}
         ) => {

    const rightComponent = () =>{
        switch (selectedItem) {
            case 'stock':
                return (<StockItem />);
            case 'forex':
                return (<ForexItem/>);
            case 'crypto':
                return (<CryptoItem isNew={false}/>);
            default:
                return (
                    <Spinner/>
                )
        }
    }

    return (
        <div className='selected-item-wrapper'>
            {rightComponent()}
        </div>
    );
};

SelectedItem.protoTypes = {
    stock: PropTypes.object.isRequired,
    forex: PropTypes.object.isRequired,
    crypto: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    stock: state.stock,
    forex: state.forex,
    crypto: state.crypto
})

export default connect(mapStateToProps)(SelectedItem);
