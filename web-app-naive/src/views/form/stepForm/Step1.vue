<template>
  <n-form
    :label-width="90"
    :model="formValue"
    :rules="rules"
    label-placement="left"
    ref="form1Ref"
    style="max-width: 500px; margin: 40px auto 0 80px"
  >
    <n-form-item label="payment account" path="myAccount">
      <n-select
        placeholder="Please select a payment account"
        :options="myAccountList"
        v-model:value="formValue.myAccount"
      />
    </n-form-item>
    <n-form-item label="Accounts receivable" path="account">
      <n-input-group>
        <n-select
          placeholder="please choose"
          :options="accountTypeList"
          :style="{ width: '20%' }"
          v-model:value="formValue.accountType"
        />
        <n-input
          placeholder="Please enter the payment account"
          :style="{ width: '80%' }"
          v-model:value="formValue.account"
        />
      </n-input-group>
    </n-form-item>
    <n-form-item label="Payee Name" path="name">
      <n-input placeholder="Please enter the payee name" v-model:value="formValue.name" />
    </n-form-item>
    <n-form-item label="transfer amount" path="money">
      <n-input placeholder="Please enter the transfer amount" v-model:value="formValue.money">
        <template #prefix>
          <span class="text-gray-400">￥</span>
        </template>
      </n-input>
    </n-form-item>
    <div style="margin-left: 80px">
      <n-space>
        <n-button type="primary" @click="formSubmit">下一步</n-button>
      </n-space>
    </div>
  </n-form>
</template>

<script lang="ts" setup>
  import { ref, defineEmits } from 'vue';
  import { useMessage } from 'naive-ui';

  const myAccountList = [
    {
      label: 'NaiveUiAdmin@163.com',
      value: 1,
    },
    {
      label: 'NaiveUiAdmin@qq.com',
      value: 2,
    },
  ];

  const accountTypeList = [
    {
      label: 'WeChat',
      value: 1,
    },
    {
      label: 'Alipay',
      value: 2,
    },
  ];

  const emit = defineEmits(['nextStep']);

  const form1Ref: any = ref(null);
  const message = useMessage();

  const formValue = ref({
    accountType: 1,
    myAccount: null,
    account: 'xioama@qq.com',
    money: '1980',
    name: 'Ah jung',
  });

  const rules = {
    name: {
      required: true,
      message: 'Please enter the payee name',
      trigger: 'blur',
    },
    account: {
      required: true,
      message: 'Please enter the payment account',
      trigger: 'blur',
    },
    money: {
      required: true,
      message: 'Please enter the transfer amount',
      trigger: 'blur',
    },
    myAccount: {
      required: true,
      type: 'number',
      message: 'Please select a payment account',
      trigger: 'change',
    },
  };

  function formSubmit() {
    form1Ref.value.validate((errors) => {
      if (!errors) {
        emit('nextStep');
      } else {
        message.error('Verification failed, please fill in the full information');
      }
    });
  }
</script>
