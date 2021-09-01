<template>
  <n-card :bordered="false" class="proCard">
    <div class="result-box">
      <n-result
        status="info"
        title="hint"
        description="This submission will automatically transfer to the other party within 24 hours, such as the operation error, please recover in time"
      >
        <div class="result-box-extra">
          <p>The content you submit is as follows:</p>
          <p class="mt-3">
            <n-space align="center">
              <n-icon size="20" color="#18a058">
                <CheckCircleOutlined />
              </n-icon>
              <span>Transfer to Alipay account (189 **** 5426): ¥ 1980</span>
              <n-button type="info" text>Recover immediately</n-button>
            </n-space>
          </p>
          <p class="mt-3">
            <n-space>
              <n-icon size="20" color="#18a058">
                <CheckCircleOutlined />
              </n-icon>
              <span>Transfer to Alipay account (187 **** 5426): ¥ 2980 yuan</span>
              <n-button type="info" text>Recover immediately</n-button>
            </n-space>
          </p>
        </div>
        <template #footer>
          <div class="flex justify-center mb-4">
            <n-space align="center">
              <n-button type="info" @click="goHome">back to the homepage</n-button>
              <n-button>check the details</n-button>
              <n-button>All withdrawn</n-button>
            </n-space>
          </div>
        </template>
      </n-result>
    </div>
  </n-card>
</template>
<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { CheckCircleOutlined } from '@vicons/antd';

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
