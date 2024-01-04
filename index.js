const express = require('express');
require('dotenv').config();
const { connect, close } = require('./db/db.js');
const app = express();
const cors = require('cors');
const port = 3004;
const routes = require('./routes/routes.js');


app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


// routes
app.use('/', routes);

const main = async () => {
    await connect()
}

app.listen(port, () => console.log(`Listening on port ${port}`));


main()