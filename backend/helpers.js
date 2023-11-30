class BridgeMock {
    STATUSES = {
        NEW: "NEW",
        READY: "READY",
        RINGING: "RINGING",
        CONNECTED: "CONNECTED",
        BRIDGED: "BRIDGED",
        ANSWERED: "ANSWERED",
        FAILED: "FAILED"
    }

    constructor() {

    }

    async getStatus() {
        return 'RINGING';
    }
}

class DialerMock {
    constructor() {

    }

    async call(num1, num2) {
        await new Promise(resolve => setTimeout(resolve, 2000))
        let bridge = new BridgeMock();
        return bridge;
    }
}

module.exports = {
    DialerMock
};