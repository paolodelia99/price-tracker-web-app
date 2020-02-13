const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({extended: false}));

//Define Routes
app.use('/api/auth/',require('./routes/api/auth'));
app.use('/api/user/',require('./routes/api/user'));
app.use('/api/profile/',require('./routes/api/profile'))
app.use('/api/stock/', require('./routes/api/stock'));
app.use('/api/forex/',require('./routes/api/forex'));
app.use('/api/crypto/',require('./routes/api/crypto'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));