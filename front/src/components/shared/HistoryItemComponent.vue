<template>
  <div class="flex flex-row ">
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
      timePassedString: "1 m.",
      dateString: this.historyItem.date
        ? formatDate(this.historyItem.date)
        : "",
    };
  },
};
</script>