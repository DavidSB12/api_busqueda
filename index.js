const express = require('express');
require('dotenv').config();
const { connect, close } = require('./db/db.js');
const app = express();
const port = 3004;
const routes = require('./routes/routes.js');

// routes
app.use('/', routes);

const main = async () => {
    await connect()
}

app.listen(port, () => console.log(`Listening on port ${port}`));


main()