require('dotenv').config()
const { DialerMock } = require('./utils/DialerMocks');

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
const { MongoClient, ObjectId } = require('mongodb');
const { v4: uuidv4 } = require('uuid');

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

const client = new MongoClient(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
const database = client.db(process.env.MONGOD_DB_NAME);
const callsHistoryCollection = database.collection(process.env.MONGO_HISTORY_COLLECTION_NAME);

const io = new Server(serverInstance);

httpServer.post('/call/', async (req, res) => {
    const client_number = req.body.number;
    const consultant_number = process.env.DIALER_PHONE_NUMBER;
    console.log('Calling:', client_number, consultant_number);
    handleCall(res, client_number, consultant_number);
})

httpServer.get('/status', async function (req, res) {
    let status = await bridge.getStatus();
    res.json({ id: '123', "status": status });
});

httpServer.get('/history', async function (req, res) {
    res.json(await callsHistoryCollection.find({}).toArray());
});

httpServer.delete('/history', async function (req, res) {
    try {
        const documentId = req.body.documentId;
        await callsHistoryCollection.deleteOne({_id: new ObjectId(documentId)});
        res.json({status: "OK"});
    } catch (err) {
        console.error("Could not delete");
        res.json({status: "FAILED"});
    }
});

async function addCallsHistoryItem(number) {
    const historyItem = {
        number: number,
        date: new Date()
    };

    await callsHistoryCollection.insertOne(historyItem);
    io.emit('newHistoryItem', historyItem);
}

async function handleCall(res, client_number, consultant_number) {
    addCallsHistoryItem(client_number);
    // TODO remove later
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockedDialer = new DialerMock();

    await mockedDialer.call(client_number, consultant_number)
        .then((result) => {
            const callId = uuidv4();
            const bridge = result;
            let oldStatus = null
            let interval = setInterval(async () => {
                let currentStatus = await bridge.getStatus();
                if (currentStatus !== oldStatus) {
                    oldStatus = currentStatus;
                    if (currentStatus === "NEW")
                        io.emit('newCall', callId, client_number);
                    else
                        io.emit('statusUpdate', callId, currentStatus);
                }
                if (
                    currentStatus === "ANSWERED" ||
                    currentStatus === "FAILED" ||
                    currentStatus === "BUSY" ||
                    currentStatus === "NO ANSWER"
                ) {
                    console.log('Call stopped')
                    io.emit('callStopped', callId);
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
}