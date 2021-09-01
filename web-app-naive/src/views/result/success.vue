<template>
  <n-card :bordered="false" class="proCard">
    <div class="result-box">
      <n-result
        status="success"
        title="Successful operation"
        description="Submission results are used to feedback a series of operational tasks, if only simple operations are only simple, the gray area can display some supplementary information."
      >
        <div class="result-box-extra">
          <p>Application has been submitted, waiting for the financial department to review.</p>
        </div>
        <template #footer>
          <div class="flex justify-center mb-4">
            <n-space align="center">
              <n-button type="info" @click="goHome">back to the homepage</n-button>
              <n-button>check the details</n-button>
              <n-button>Print</n-button>
            </n-space>
          </div>
        </template>
      </n-result>
    </div>
  </n-card>
</template>
<script lang="ts" setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();

  function goHome() {
    router.push('/');
  }
</script>
<style lang="less" scoped>
  .result-box {
    width: 72%;
    margin: 0 auto;
    text-align: center;
    padding-top: 5px;

    &-extra {
      padding: 24px 40px;
      text-align: left;
      background: #f8f8f9;
      border-radius: 4px;
    }
  }
</style>
