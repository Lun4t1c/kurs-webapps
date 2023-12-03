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

    currentStatus = this.STATUSES.NEW;

    constructor() {
        this.mockCall();
    }

    async getStatus() {
        return this.currentStatus;
    }

    async mockCall() {
        await new Promise(resolve => setTimeout(resolve, 2000));
        this.currentStatus = this.STATUSES.READY;
        console.log("Call status: ", this.STATUSES.READY);

        const shouldFail = Math.random() < 0.3;
        if (shouldFail) {
            console.error("CALL FAILED");
            this.currentStatus = this.STATUSES.FAILED;
            return;
        }

        await new Promise(resolve => setTimeout(resolve, 2000));
        this.currentStatus = this.STATUSES.RINGING;
        console.log("Call status: ", this.STATUSES.RINGING);

        await new Promise(resolve => setTimeout(resolve, 2000));
        this.currentStatus = this.STATUSES.CONNECTED;
        console.log("Call status: ", this.STATUSES.CONNECTED);

        await new Promise(resolve => setTimeout(resolve, 2000));
        this.currentStatus = this.STATUSES.BRIDGED;
        console.log("Call status: ", this.STATUSES.BRIDGED);

        await new Promise(resolve => setTimeout(resolve, 10000));
        this.currentStatus = this.STATUSES.ANSWERED;
        console.log("Call status: ", this.STATUSES.ANSWERED);
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