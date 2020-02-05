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
import popularMarkets from '../../resources/popularMarket';
//Redux
import { connect } from 'react-redux'
import StockItem from "../FinancialItem/StockItem";
import ForexItem from "../FinancialItem/ForexItem";
import CryptoItem from "../FinancialItem/CryptoItem";
import {takeOutEveryThing} from "../../actions/profile";
import {getRandomStock} from "../../actions/stock";
import {getForex} from "../../actions/forex";
import {getCrypto} from "../../actions/crypto";
let randomWords = require('random-words');

const InitialPage =
    ({
         auth:{user},
         profile :{profile,loading,stocksCollection,forexCollection,cryptoCollection},
         takeOutEveryThing,
         getRandomStock,
         getForex,
        getCrypto
    }) => {
    const classes = initialPageStyle();

    const selectRandom = () => {
        const randomNumber = Math.floor(Math.random() * 3) + 1;
        switch (randomNumber) {
            case 1:
                let casualWord = randomWords();
                casualWord = "" + casualWord.substring(0, 2);
                takeOutEveryThing();
                getRandomStock(casualWord)
                return (<StockItem />);
            case 2:
                let randomExchange = getRandomForexExchange();
                takeOutEveryThing();
                getForex(randomExchange);
                return (<ForexItem />);
            case 3:
                let randomCrypto = getRandomCrypto();
                takeOutEveryThing();
                getCrypto(randomCrypto);
                return (<CryptoItem isNew={true}/>);
            default:
                let casualWord1 = randomWords();
                casualWord = "" + casualWord1.substring(0, 2);
                takeOutEveryThing();
                getRandomStock(casualWord1)
                return (<StockItem />);
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
        const marketList = popularMarkets;
        const lengthList =  marketList.popularMarket.length;

        const randomItem1 = Math.floor(Math.random() *lengthCryptoList)+1;
        const randomItem2 =  Math.floor(Math.random() *lengthList)+1;

        console.log(`cyrpto code:${cryptoList.digitalCurrencyList[randomItem1]['currency code']}, crypto name: ${cryptoList.digitalCurrencyList[randomItem1]['currency name']}`)
        console.log(`market ${marketList.popularMarket[randomItem2]['currency code']}, market name: ${marketList.popularMarket[randomItem2]['currency name']}`)

        console.log(cryptoList.digitalCurrencyList[randomItem1]['currency code']+"/"+marketList.popularMarket[randomItem2]['currency code'])

        return ""+cryptoList.digitalCurrencyList[randomItem1]['currency code']+"/"+marketList.popularMarket[randomItem2]['currency code'];
    };

    return (
        <Fragment>
            <Container maxWidth='lg' className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item md={12}>
                        <Typography variant='h4' align='center' className={classes.text}>
                            Welcome {user && user.firstName}
                        </Typography>
                        <Typography variant='h5' align='center' className={classes.text}>
                            Take a look to this:
                        </Typography>
                    </Grid>
                    <Grid item md={12} className='selected-item-wrapper'>
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
    takeOutEveryThing: PropTypes.func.isRequired,
    getCrypto: PropTypes.func.isRequired,
    getForex: PropTypes.func.isRequired,
    getRandomStock: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default
connect(
    mapStateToProps,
    {takeOutEveryThing,
        getForex,
        getCrypto,
        getRandomStock
    }
)(InitialPage);
