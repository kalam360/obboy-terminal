<template></template>
<script lang="ts">
  import { useLoadingBar } from 'naive-ui';

  export default {
    name: 'LoadingContent',
    setup() {
      //Mounted window Easy to use in JS
      window['$loading'] = useLoadingBar();
    },
  };
</script>
