<template>
  <div class="flex flex-row">
    <div class="w-fit mr-5">
      {{ timePassedString }}
    </div>
    <div>
      {{ historyItem.number }}
    </div>
  </div>
</template>

<script>
import { formatDate } from "../../utils/helpers";

export default {
  props: {
    historyItem: {
      type: Object,
      default: () => ({ number: 0, date: null }),
    },
  },
  data() {
    return {
      timePassedString: "",
      dateString: this.historyItem.date
        ? formatDate(this.historyItem.date)
        : "",
    };
  },
  methods: {
    calculateTimePassed() {
      const targetDate = new Date(this.historyItem.date);
      const currentDate = new Date();

      const timeDifference = currentDate - targetDate;

      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (seconds < 60) {
        this.timePassedString = 1 + 'm';
      }
      else if (minutes < 60)
        this.timePassedString = minutes + 'm';
      else if (hours < 24)
        this.timePassedString = hours + 'h';
      else 
        this.timePassedString = days + 'd';
    },

    startSecondsInterval() {
      setInterval(() => {
        this.calculateTimePassed();
      }, 1000);
    },

    formatTimePassedString() {

    }
  },
  mounted() {
    this.calculateTimePassed();
    this.startSecondsInterval();
  },
};
</script>