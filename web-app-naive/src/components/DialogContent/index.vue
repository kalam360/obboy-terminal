<template></template>
<script lang="ts">
  import { useDialog } from 'naive-ui';

  export default {
    name: 'DialogContent',
    setup() {
      //Mounting in WINDOW is convenient to use in JS
      window['$dialog'] = useDialog();
    },
  };
</script>
