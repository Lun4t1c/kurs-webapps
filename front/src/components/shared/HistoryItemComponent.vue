<template>
  <div class="flex flex-row justify-between">
    <div class="w-1 ml-2 mr-5 text-2xl">
      {{ getTimePassedString }}
    </div>
    <div class="text-2xl">
      {{ getNumberString }}
    </div>

    <button class="btn-danger w-fit h-fit px-1 mr-2 self-center" @click="deleteCallback">X</button>
  </div>
</template>

<script>
import { formatPhoneNumber } from "../../utils/helpers";

export default {
  props: {
    historyItem: {
      type: Object,
      default: () => ({ number: 0, date: null }),
    },
    deleteCallback: {
      type: Function,
      default: () => {
        console.error("Callback not provided");
      },
    },
  },
  data() {
    return {
      numberString: "",
      timePassedString: "",
    }
  },
  methods: {
    calculateTimePassed() {
      let result = '';
      const targetDate = new Date(this.historyItem.date);
      const currentDate = new Date();

      const timeDifference = currentDate - targetDate;

      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (seconds < 60) {
        result = 1 + "m";
      } else if (minutes < 60) result = minutes + "m";
      else if (hours < 24) result = hours + "h";
      else result = days + "d";

      return result;
    },

    startSecondsInterval() {
      setInterval(() => {
        this.timePassedString = this.calculateTimePassed();
      }, 1000);
    },
  },
  mounted() {
    this.calculateTimePassed();
    this.startSecondsInterval();
    this.numberString = formatPhoneNumber(this.historyItem.number);
  },
  computed: {
    getNumberString() {
      return formatPhoneNumber(this.historyItem.number)
    },
    getTimePassedString() {
      return this.calculateTimePassed();
    }
  },
};
</script>