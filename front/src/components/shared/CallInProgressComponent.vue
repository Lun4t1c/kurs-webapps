<template>
  <div>
    <p>{{ callItem.number }} - {{ callItem.status }}</p>
  </div>
</template>

<script>

export default {
  props: {
    callItem: {
      type: Object,
      default: () => ({ id: '', number: 0, status: '' }),
    },
  },
  data() {
    return {
      
    };
  },
};
</script>