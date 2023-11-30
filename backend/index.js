require('dotenv').config()
const { DialerMock } = require('./helpers');

const express = require('express');
const httpServer = express();
const { Server } = require('socket.io');
const dialer = require('dialer').Dialer;
const config = {
    url: 'https://uni-call.fcc-online.pl',
    login: process.env.DIALER_LOGIN,
    password: process.env.DIALER_PASSWORD
};
const cors = require('cors');
const bodyParser = require('body-parser');

httpServer.use(bodyParser.json());
httpServer.use(cors());
httpServer.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
});

dialer.configure(config);

const serverInstance = httpServer.listen(3000,
    function () {
        console.log('Example app listening on port 3000!');
    }
);

const io = new Server(serverInstance);

httpServer.post('/call/', async (req, res) => {
    const number1 = req.body.number;
    const number2 = process.env.DIALER_PHONE_NUMBER;
    console.log('Calling:', number1, number2)

    // TODO remove later
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockedDialer = new DialerMock();

    await mockedDialer.call(number1, number2)
        .then((result) => {
            const bridge = result;
            let oldStatus = null
            let interval = setInterval(async () => {
                let currentStatus = await bridge.getStatus();
                if (currentStatus !== oldStatus) {
                    oldStatus = currentStatus;
                    io.emit('status', currentStatus);
                }
                if (
                    currentStatus === "ANSWERED" ||
                    currentStatus === "FAILED" ||
                    currentStatus === "BUSY" ||
                    currentStatus === "NO ANSWER"
                ) {
                    console.log('Call stopped')
                    clearInterval(interval)
                }
            }, 1000);

            res.json({
                id: '123', status: bridge.STATUSES.NEW
            });
        })
        .catch((err) => {
            console.error(err);
            res.json({ id: '123', status: 'FAILED' });
        });
})

httpServer.get('/status', async function (req, res) {
    let status = await bridge.getStatus();
    res.json({ id: '123', "status": status });
})