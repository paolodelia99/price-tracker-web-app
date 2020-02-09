# Price Tracker Web App

Do you want to keep track of your favourite stocks? Do you want to be update with the latest BTC price? 
<br/>
This web app is for you! 

Since I'm little bit interesting in finance, I was thinking about creating my own app that keep tracks of all my favorites stock, forex exchange and crypto currencies.
And now that I have the skills to do it, I did it!

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

# add your Crypto compare api kei ( I use this api key for getting the crypto info such as volume24h, change%,
...)

 "CRYPTO_API_KEY": "your-crypto-compare-api-key"

# add you World trade api 

 "WORLD_TRADE_API_KEY": "your-world-trade-api"
```

## Folder Structure

For the folder structure I've done in this way: 

```
.
├── README.md
├── package-lock.json
├── package.json
├── client
├── config
│   ├── db.js
│   └── default.json
├── middleware
│   └── auth.js
├── models
│   ├── Profile.js
│   └── User.js
└── routes
│    └── api
│         ├──  auth.js
│         ├──  crypto.js
│         ├──  forex.js
│         ├──  profile.js
│         ├──  stock.js
│         └──  user.js
├── .env
├── .gitingnore
└── server.js
```
I'll show you the client folder structure later, when I'll talk about the front-end

## Backend

For the backend I've imported the following packages from npm: 

- create-react-app: for creating the react app in the client folder
- bcryptjs: for hashing the user passwords
- config: for managing the configurations file
- jsonwebtoken: for creating JSON-based access tokens
- request: for making http calls to the external apis
- express: as a backend framework
- mongoose: as a Object Data Modeling library for MongoDB and Node.js
 <br/>
 <br/>
 And as the devs dependencies I've used: 
 
- concurrently: for running the server and the client at the same time, without having two terminal opened at the same time
- nodemon: a utility that will monitor for any changes in your source and automatically restart your server

---
