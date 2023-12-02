<template>
  <div class="flex flex-row">
    <font-awesome-icon
      icon="circle"
      class="icon-transition w-3 m-1 mr-3"
      :class="statusColorClass"
    />

    <div>
      {{ callItem.number }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    callItem: {
      type: Object,
      default: () => ({ id: "", number: 0, status: "" }),
    },
  },
  computed: {
    statusColorClass() {
      switch (this.callItem.status) {
        case "READY":
        case "RINGING":
          return "text-blue-500";
        case "BRIDGED":
        case "ANSWERED":
        case "CONNECTED":
          return "text-green-500";
        case "FAILED":
          return "text-red-500";
        default:
          return "text-gray-500";
      }
    },
  },
};
</script>