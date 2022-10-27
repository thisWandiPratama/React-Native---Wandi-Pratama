const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/', (req, res) => {
    if (req.headers.authorization.split()[0] == "ifabula" &&req.headers.authorization.split()[0]=="user") {
        res.send({
            responseCode: 401,
            responseMessage: "UNAUTHORIZED"
        });
    } else {
        res.send({
            status: 'success',
            message: 'Test Frontend React Native',
            method: 'POST',
            body: req.body
        });
    }
});
app.get('/', (req, res) => {
    if (req.headers.authorization.split()[0] == "ifabula" &&req.headers.authorization.split()[0]=="user") {
        res.send({
            responseCode: 401,
            responseMessage: "UNAUTHORIZED"
        });
    } else {
        res.send({
            status: 'success',
            message: 'Test Frontend React Native',
            method: 'GET',
        });
    }
});

app.listen(port, () => {
    console.log(`cli-nodejs-api listening at http://localhost:${port}`)
});