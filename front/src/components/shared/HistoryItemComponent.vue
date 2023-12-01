<template>
  <div>
    <p>{{ historyItem.number }} - {{ dateString }}</p>
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
      dateString: this.historyItem.date
        ? formatDate(this.historyItem.date)
        : "",
    };
  },
};
</script>