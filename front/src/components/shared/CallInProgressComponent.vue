<template>
  <div class="flex flex-row">
    <font-awesome-icon
      icon="circle"
      class="icon-transition h-8 m-1 mr-3 ml-2"
      :class="statusColorClass"
    />

    <div class="items-center justify-center h-8 text-2xl">
      {{ callItem.number }}
    </div>

    <div class="items-center h-8 ml-auto text-2xl">
      {{ timePassedString }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timePassedString: "",
      dateBridged: null,
      bridgedInterval: null,
      passedSeconds: 0,
    };
  },
  props: {
    callItem: {
      type: Object,
      default: () => ({ id: "", number: 0, status: "" }),
    },
  },
  methods: {
    setIntervalForBridged() {
      this.clearInterval();

      this.intervalId = setInterval(() => {
        this.passedSeconds += 1;
        this.updateTimePassedString();
      }, 1000);
    },

    clearInterval() {
      if (this.intervalId !== null) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },

    updateTimePassedString() {
      let seconds = this.passedSeconds;
      let minutes = 0;

      let secondsString = "";
      let minutesString = "";

      while (seconds >= 60) {
        seconds -= 60;
        minutes += 1;
      }

      minutesString =
        minutes >= 10 ? minutes.toString() : "0" + minutes.toString();

      secondsString =
        seconds >= 10 ? seconds.toString() : "0" + seconds.toString();

      this.timePassedString = minutesString + ":" + secondsString;
    },
  },
  computed: {
    statusColorClass() {
      switch (this.callItem.status) {
        case "NEW":
        case "ANSWERED":
          return "text-gray-500";
        case "READY":
        case "RINGING":
        case "CONNECTED":
          return "text-blue-500";
        case "BRIDGED":
          return "text-green-500";
        case "FAILED":
          return "text-red-500";
        default:
          return "text-gray-500";
      }
    },
  },
  watch: {
    "callItem.status": function (newStatus) {
      if (newStatus === "BRIDGED") this.setIntervalForBridged();
      if (newStatus === "ANSWERED") this.clearInterval();
    },
  },
  beforeUnmount() {
    this.clearInterval();
  },
};
</script>