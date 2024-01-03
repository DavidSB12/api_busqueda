const express = require('express');
require('dotenv').config();
const { connect, close } = require('./db/db.js');
const app = express();
const port = 3004;

const main = async () => {
    await connect()
}

app.listen(port, () => console.log(`Listening on port ${port}`));


main()