# Price Tracker Web App

Do you want to keep track of your favourite stocks? Do you want to be update with the latest BTC price? 
<br/>
This web app is for you! 

Since I'm little bit interesting in finance, I was thinking about creating my own app that keep tracks of all my favorites stock, forex exchange and cripocurrency.
And now that I have the skills to do it, I made it!

---

# App Info

Tools that I've used to build this app:
- [Mongodb](https://www.mongodb.com/) - as database
- [React](https://reactjs.org/) - for the front-end
- [Express](https://expressjs.com/) - as a back-end framework
- [Redux](https://redux.js.org/) - for linking the back-end with the front-end
- [Material-UI](https://material-ui.com/) - as a React UI framework (also to make more similar to the real Google Keep)
- [Alpha Vantage](https://www.alphavantage.co/) - for getting the stock, forex and crypto data
- [Plot.ly](https://plot.ly/) - for displaying the charts
- [World Trading Data](https://www.worldtradingdata.com/)- as a API for getting stock info
- [Crypto Compare](https://www.cryptocompare.com/) - as a API for getting crypto info
## Quick Start: how to install it

```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install

# Run both Express & React from root
npm run dev

# Build for production
cd client
npm run build
```

```
# change default.json file in config folder

# add uri of your mongodb connection for example

 "mongoURI": "mongodb://localhost/price-tracker",
 
# add your alpha vantage api key (which is free)

 "ALPHA_API_KEY": "your-api-key"
```
