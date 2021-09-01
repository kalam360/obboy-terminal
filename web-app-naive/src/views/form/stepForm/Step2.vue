<template>
  <n-form
    :label-width="90"
    :model="formValue"
    :rules="rules"
    label-placement="left"
    ref="form2Ref"
    style="max-width: 500px; margin: 40px auto 0 80px"
  >
    <n-form-item label="payment account" path="myAccount">
      <span>NaiveUiAdmin@163.com</span>
    </n-form-item>
    <n-form-item label="Accounts receivable" path="account">
      <span>NaiveUiAdmin@qq.com</span>
    </n-form-item>
    <n-form-item label="Payee Name" path="name">
      <span>Ah jung</span>
    </n-form-item>
    <n-form-item label="transfer amount" path="money">
      <span>￥1980</span>
    </n-form-item>
    <n-divider />
    <n-form-item label="Pay password" path="password">
      <n-input type="password" v-model:value="formValue.password" />
    </n-form-item>
    <div style="margin-left: 80px">
      <n-space>
        <n-button type="primary" :loading="loading" @click="formSubmit">submit</n-button>
        <n-button @click="prevStep">Previous</n-button>
      </n-space>
    </div>
  </n-form>
</template>

<script lang="ts" setup>
  import { ref, defineEmits } from 'vue';
  import { useMessage } from 'naive-ui';
  const form2Ref: any = ref(null);
  const message = useMessage();
  const loading = ref(false);

  const formValue = ref({
    password: '086611',
  });

  const rules = {
    password: {
      required: true,
      message: 'Please enter the payment password',
      trigger: 'blur',
    },
  };

  const emit = defineEmits(['prevStep', 'nextStep']);

  function prevStep() {
    emit('prevStep');
  }

  function formSubmit() {
    loading.value = true;
    form2Ref.value.validate((errors) => {
      if (!errors) {
        setTimeout(() => {
          emit('nextStep');
        }, 1500);
      } else {
        message.error('Verification failed, please fill in the full information');
      }
    });
  }
</script>
