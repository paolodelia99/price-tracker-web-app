import {
    FIND_ITEMS,
    GET_FOUND_STOCK,
    GET_FOUND_CRYPTO,
    GET_FOUND_FOREX
} from "./types";
import axios from 'axios'
import physicalCurrency from '../resources/physicalCurrency';
import digitalCurrency from '../resources/digitalCurrency';
import popularMarkets from '../resources/popularMarket';
import {setAlert} from "./alert";

export const findItems = (keyword) => dispatch => {
    dispatch({
        type: FIND_ITEMS
    });

    dispatch(searchStock(keyword));
    dispatch(searchForex(keyword));
    dispatch(searchCrypto(keyword));
};

//Search stock
export const searchStock = (keyword) => async dispatch => {
    try {
        const res = await axios.get(`/api/stock/search/${keyword}`);

        const searchData = res.data;

       const stockFoundList = [];

        for(let key in searchData["bestMatches"]){
            if(searchData['bestMatches'][key]['3. type'] === "Equity"){
                stockFoundList.push({
                    stockFullName: searchData['bestMatches'][key]['2. name'],
                    stockSymbol: searchData['bestMatches'][key]['1. symbol']
                });
            }
        }

        dispatch({
            type: GET_FOUND_STOCK,
            payload: stockFoundList
        })
    }catch (error) {
        dispatch(setAlert(error.message,'danger'))
    }
};

//Search Forex
export const searchForex = (keyword) => dispatch => {
    const forexList = physicalCurrency;
    const forexListLength =  forexList.physicalCurrencyList.length;
    let searchWord = getSearchWord(keyword);
    let itemsFound = [];

    for(let key in forexList["physicalCurrencyList"]){
        if(forexList["physicalCurrencyList"][key]['currency code'].includes(searchWord)){
            itemsFound.push({
                currencyCode: forexList["physicalCurrencyList"][key]['currency code'],
                currencyName: forexList["physicalCurrencyList"][key]['currency name']
            })
        }
    }

    let exchangeFound = [];
    let randomIndexesArray = getFiveRandomIndexes(forexListLength);

    if(itemsFound.length === 0){
        //Do Nothing
    }else if(itemsFound.length === 1){

        for(let i=0;i<randomIndexesArray.length;i++){
            exchangeFound.push({
                fromCurrencySymbol: itemsFound[0].currencyCode,
                fromCurrencyName: itemsFound[0].currencyName,
                toCurrencySymbol: forexList.physicalCurrencyList[randomIndexesArray[i]]['currency code'],
                toCurrencyName: forexList.physicalCurrencyList[randomIndexesArray[i]]['currency name']
            })
        }

    }else if(itemsFound.length === 2){

        for(let i=0;i<randomIndexesArray.length;i++){
            if(i%2 === 0)
                exchangeFound.push({
                    fromCurrencySymbol: itemsFound[0].currencyCode,
                    fromCurrencyName: itemsFound[0].currencyName,
                    toCurrencySymbol: forexList.physicalCurrencyList[randomIndexesArray[i]]['currency code'],
                    toCurrencyName: forexList.physicalCurrencyList[randomIndexesArray[i]]['currency name']
                });
            else
                exchangeFound.push({
                    fromCurrencySymbol: itemsFound[1].currencyCode,
                    fromCurrencyName: itemsFound[1].currencyName,
                    toCurrencySymbol: forexList.physicalCurrencyList[randomIndexesArray[i]]['currency code'],
                    toCurrencyName: forexList.physicalCurrencyList[randomIndexesArray[i]]['currency name']
                })
        }

    }else{

        for(let key in itemsFound){

            let randomIndex;

            do {
                randomIndex = Math.floor(Math.random() *forexListLength);
            }while(itemsFound[key].currencyCode === forexList.physicalCurrencyList[randomIndex]['currency code']);

            exchangeFound.push({
                fromCurrencySymbol: itemsFound[key].currencyCode,
                fromCurrencyName: itemsFound[key].currencyName,
                toCurrencySymbol: forexList.physicalCurrencyList[randomIndex]['currency code'],
                toCurrencyName: forexList.physicalCurrencyList[randomIndex]['currency name']
            })
        }
    }

    dispatch({
        type: GET_FOUND_FOREX,
        payload: exchangeFound
    })
};

//get five random indexes when one item is found
const getFiveRandomIndexes = (maxLength) => {
    const randomIndexesArray = [];
    //get five random indexes
    for(let i=0;i<5;i++){
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * maxLength);
        }while (randomIndexesArray.includes(randomIndex));
        randomIndexesArray.push(randomIndex)
    }

    return randomIndexesArray;
};

//Exchange Crypto
export const searchCrypto = (keyword) => dispatch => {
    const cryptoList = digitalCurrency;
    const marketList = popularMarkets;
    const marketListLength =  marketList.popularMarket.length;
    let searchWord = getSearchWord(keyword);
    let itemsFound = [];

    for(let key in cryptoList["digitalCurrencyList"]){
        if(cryptoList["digitalCurrencyList"][key]['currency code'].includes(searchWord)){
            itemsFound.push({
                currencyCode: cryptoList["digitalCurrencyList"][key]['currency code'],
                currencyName: cryptoList["digitalCurrencyList"][key]['currency name']
            })
        }
    }

    let cryptoExchangeFound = [];
    const randomIndexesArray = getFiveRandomIndexes(marketListLength);

    if(itemsFound.length === 0){
        //Do nothing
    }else if(itemsFound.length === 1){

        for(let i=0;i<randomIndexesArray.length;i++){
            cryptoExchangeFound.push({
                fromCurrencySymbol: itemsFound[0].currencyCode,
                fromCurrencyName: itemsFound[0].currencyName,
                toCurrencySymbol: marketList.popularMarket[randomIndexesArray[i]]['currency code'],
                toCurrencyName: marketList.popularMarket[randomIndexesArray[i]]['currency name']
            })
        }

    }else if(itemsFound.length === 2){

        for(let i=0;i<randomIndexesArray.length;i++){
            if(i%2 === 0)
                cryptoExchangeFound.push({
                    fromCurrencySymbol: itemsFound[0].currencyCode,
                    fromCurrencyName: itemsFound[0].currencyName,
                    toCurrencySymbol: marketList.popularMarket[randomIndexesArray[i]]['currency code'],
                    toCurrencyName: marketList.popularMarket[randomIndexesArray[i]]['currency name']
                });
            else
                cryptoExchangeFound.push({
                    fromCurrencySymbol: itemsFound[1].currencyCode,
                    fromCurrencyName: itemsFound[1].currencyName,
                    toCurrencySymbol: marketList.popularMarket[randomIndexesArray[i]]['currency code'],
                    toCurrencyName: marketList.popularMarket[randomIndexesArray[i]]['currency name']
                })
        }

    }else{

        for(let key in itemsFound){
            let randomIndex = Math.floor(Math.random() * marketListLength);

            cryptoExchangeFound.push({
                fromCurrencySymbol: itemsFound[key].currencyCode,
                fromCurrencyName: itemsFound[key].currencyName,
                toCurrencySymbol: marketList.popularMarket[randomIndex]['currency code'],
                toCurrencyName: marketList.popularMarket[randomIndex]['currency name']
            })
        }
    }

    dispatch({
        type: GET_FOUND_CRYPTO,
        payload: cryptoExchangeFound
    })
};

//get search word function for cryptos and forex
const getSearchWord = (keyword) => {
    let searchWord = keyword;

    if(keyword.length >= 3)
        searchWord= keyword.substring(0,2);

    return searchWord.toUpperCase();
};
