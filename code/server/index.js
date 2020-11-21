const express = require('express');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: ["p9q8wrghuasgf98a34yhfauisd"]
    })
);


if(process.env.NODE_ENV === 'production') {
    //Express will serve up production assets like main.js
    app.use(express.static('client/build'));

    //Express will serve up index.html if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT);