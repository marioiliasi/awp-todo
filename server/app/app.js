const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

require('./routes')(app);
const dir = path.join(__dirname, 'assets');
app.use('/upload', express.static(dir));

const port = 3000;

app.listen(port, () => {
    console.log(`Todo app listening at http://localhost:${port}`);
})

app.get('/', (req, res) => {
    res.send('Up!');
})

