<template>
  <n-card :bordered="false" class="proCard">
    <div class="result-box">
      <n-result status="error" title="operation failed" description="Please check and modify the following information, then resubmit it.">
        <div class="result-box-extra">
          <p>The content you submit has the following error:</p>
          <p class="mt-3">
            <n-space align="center">
              <n-icon size="20" color="#f0a020">
                <InfoCircleOutlined />
              </n-icon>
              <span>Certified photos are not clear enough</span>
              <n-button type="info" text>Immediate modification</n-button>
            </n-space>
          </p>
          <p class="mt-3">
            <n-space>
              <n-icon size="20" color="#f0a020">
                <InfoCircleOutlined />
              </n-icon>
              <span>Remarks contain sensitive characters and cannot include political correlation</span>
              <n-button type="info" text>Immediate modification</n-button>
            </n-space>
          </p>
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
  import { InfoCircleOutlined } from '@vicons/antd';

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
