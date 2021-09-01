<template>
  <n-grid cols="2 s:2 m:2 l:3 xl:3 2xl:3" responsive="screen">
    <n-grid-item>
      <n-form :label-width="80" :model="formValue" :rules="rules" ref="formRef">
        <n-form-item label="Website name" path="name">
          <n-input v-model:value="formValue.name" placeholder="Please enter the name of the website" />
        </n-form-item>

        <n-form-item label="Record number" path="icpCode">
          <n-input placeholder="Please enter the filing number" v-model:value="formValue.icpCode" />
        </n-form-item>

        <n-form-item label="contact number" path="mobile">
          <n-input placeholder="Please type your phone number" v-model:value="formValue.mobile" />
        </n-form-item>

        <n-form-item label="contact address" path="address">
          <n-input v-model:value="formValue.address" type="textarea" placeholder="Please enter your contact address" />
        </n-form-item>

        <n-form-item label="Login verification code" path="loginCode">
          <n-radio-group v-model:value="formValue.loginCode" name="loginCode">
            <n-space>
              <n-radio :value="1">Open</n-radio>
              <n-radio :value="0">closure</n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>

        <n-form-item label="Website open access" path="systemOpen">
          <n-switch
            size="large"
            v-model:value="formValue.systemOpen"
            @update:value="systemOpenChange"
          />
        </n-form-item>

        <n-form-item label="Website Close prompt" path="closeText">
          <n-input
            v-model:value="formValue.closeText"
            type="textarea"
            placeholder="Please enter the website to close prompt"
          />
        </n-form-item>

        <div>
          <n-space>
            <n-button type="primary" @click="formSubmit">Update basic information</n-button>
          </n-space>
        </div>
      </n-form>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, toRefs } from 'vue';
  import { useDialog, useMessage } from 'naive-ui';

  const rules = {
    name: {
      required: true,
      message: 'Please enter the name of the website',
      trigger: 'blur',
    },
    mobile: {
      required: true,
      message: 'Please type your phone number',
      trigger: 'input',
    },
  };

  export default defineComponent({
    setup() {
      const formRef: any = ref(null);
      const message = useMessage();
      const dialog = useDialog();

      const state = reactive({
        formValue: {
          name: '',
          mobile: '',
          icpCode: '',
          address: '',
          loginCode: 0,
          closeText:
            'On website maintenance, you can't access it! This website is underway system maintenance and technology upgrade, the website is temporarily unable to access, please understand!',
          systemOpen: true,
        },
      });

      function systemOpenChange(value) {
        if (!value) {
          dialog.warning({
            title: 'hint',
            content: 'Do you sure you want to turn off your system? This operation immediately took effect, please take carefully!',
            positiveText: 'Sure',
            negativeText: 'Cancel',
            onPositiveClick: () => {
              message.success('Successful operation');
            },
            onNegativeClick: () => {
              state.formValue.systemOpen = true;
            },
          });
        }
      }

      function formSubmit() {
        formRef.value.validate((errors) => {
          if (!errors) {
            message.success('Verification success');
          } else {
            message.error('Verification failed, please fill in the full information');
          }
        });
      }

      function resetForm() {
        formRef.value.restoreValidation();
      }

      return {
        formRef,
        ...toRefs(state),
        rules,
        formSubmit,
        resetForm,
        systemOpenChange,
      };
    },
  });
</script>
