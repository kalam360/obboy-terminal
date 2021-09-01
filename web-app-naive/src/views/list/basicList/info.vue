<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="Foundation details"> Basic details, sometimes it is also used to display read-only information. </n-card>
    </div>
    <n-card :bordered="false" class="proCard mt-4" size="small" :segmented="{ content: 'hard' }">
      <n-descriptions label-placement="left" class="py-2">
        <n-descriptions-item>
          <template #label>Payee Name</template>
          Ah
        </n-descriptions-item>
        <n-descriptions-item label="Accounts receivable">NaiveUiAdmin@qq.com</n-descriptions-item>
        <n-descriptions-item label="Payment type">支付宝</n-descriptions-item>
        <n-descriptions-item label="payment account">NaiveUiAdmin@163.com</n-descriptions-item>
        <n-descriptions-item label="transfer amount">￥1980.00</n-descriptions-item>
        <n-descriptions-item label="state">
          <n-tag type="success"> Have arrived</n-tag>
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    setup() {
      return {};
    },
  });
</script>

<style lang="less" scoped></style>
