<template></template>
<script lang="ts">
  import { useMessage } from 'naive-ui';

  export default {
    name: 'MessageContent',
    setup() {
      //Mounting in WINDOW is convenient to use in JS
      window['$message'] = useMessage();
    },
  };
</script>
