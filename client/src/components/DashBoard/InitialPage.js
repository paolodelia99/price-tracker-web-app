import React,{Fragment} from 'react';
import PropTypes from 'prop-types';
//Material UI imports
import Container from "@material-ui/core/Container";
import {initialPageStyle} from '../styles/initialPageStyle';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
//JSON OBJ
import digitalCurrency from '../../resources/digitalCurrency';
import physicalCurrency from '../../resources/physicalCurrency';
//Redux
import { connect } from 'react-redux'
import StockItem from "../FinancialItem/StockItem";
import ForexItem from "../FinancialItem/ForexItem";
import CryptoItem from "../FinancialItem/CryptoItem";
import {takeOutEveryThing} from "../../actions/profile";
import {getStock} from "../../actions/stock";
import axios from "axios";
import {setAlert} from "../../actions/alert";
import {getForex} from "../../actions/forex";
import {getCrypto} from "../../actions/crypto";
let randomWords = require('random-words');

const InitialPage =
    ({
         auth:{user},
         profile :{profile,loading,stocks,forex,crypto},
         takeOutEveryThing,
         getStock
    }) => {
    const classes = initialPageStyle();

    const selectRandom = () =>{
        const randomNumber = Math.floor(Math.random() * 3) + 1;
        switch (randomNumber) {
            case 1:
                let casualWord = randomWords();
                casualWord = ""+casualWord.substring(0,2);
                takeOutEveryThing();
                let randomSymbol = getRandomStock(casualWord);
                getStock(randomSymbol);
                return(<StockItem isNew={true}/>);
            case 2:
                let randomExchange = getRandomForexExchange();
                takeOutEveryThing();
                getForex(randomExchange);
                return (<ForexItem isNew={true}/>);
            case 3:
                let randomCrypto = getRandomCrypto();
                takeOutEveryThing();
                getCrypto(randomCrypto);
                return (<CryptoItem isNew={true}/>);
            default:
                let casualWord1 = randomWords();
                casualWord = ""+casualWord1.substring(0,2);
                takeOutEveryThing();
                let randomSymbol1 = getRandomStock(casualWord);
                getStock(randomSymbol1);
                return(<StockItem isNew={true}/>);
            }
    };

    const getRandomStock = async (word) => {
        try {
            const searchRes = await axios.get(`/api/stock/search/${word}`);

            const searchData = searchRes.data;

            const arrayLength = searchData['bestMatches'].length;

            const randomIndex = Math.floor(Math.random() * arrayLength) + 1;

            console.log(randomIndex);

            return searchData['bestMatches'][randomIndex]['1. symbol']
        }catch (err) {
            setAlert('Error','danger')
        }
    };

    const getRandomForexExchange = () =>{
        const forexList = physicalCurrency;
        const lengthList =  forexList.physicalCurrencyList.length;

        const randomItem1 = Math.floor(Math.random() *lengthList)+1;
        let randomItem2;
        do {
            randomItem2 = Math.floor(Math.random() *lengthList)+1;
        }while (randomItem2 === randomItem1);

        return ""+forexList.physicalCurrencyList[randomItem1]['currency code']+"/"+forexList.physicalCurrencyList[randomItem2]['currency code'];
    };

    const getRandomCrypto = () =>{
        const cryptoList = digitalCurrency;
        const lengthCryptoList =  cryptoList.digitalCurrencyList.length;
        const forexList = physicalCurrency;
        const lengthList =  forexList.physicalCurrencyList.length;

        const randomItem1 = Math.floor(Math.random() *lengthCryptoList)+1;
        const randomItem2 =  Math.floor(Math.random() *lengthList)+1;

        return ""+forexList.digitalCurrencyList[randomItem1]['currency code']+"/"+forexList.physicalCurrencyList[randomItem2]['currency code'];
    };

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
                    <Grid item>
                        {selectRandom()}
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    );
};

InitialPage.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    takeOutEveryThing: PropTypes.object.isRequired,
    getStock: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default
connect(
    mapStateToProps,
    {takeOutEveryThing,
        getStock}
)(InitialPage);
