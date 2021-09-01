<template>
  <n-grid cols="2 s:2 m:2 l:3 xl:3 2xl:3" responsive="screen">
    <n-grid-item>
      <n-form :label-width="120" :model="formValue" :rules="rules" ref="formRef">
        <n-form-item label="Sender mailbox" path="originator">
          <n-input v-model:value="formValue.originator" placeholder="Please enter a sender mailbox" />
        </n-form-item>

        <n-form-item label="SMTP server address">
          <n-input placeholder="Please enter the SMTP server address" />
        </n-form-item>

        <n-form-item label="SMTP server port">
          <n-input placeholder="Please enter the SMTP server port" />
        </n-form-item>

        <n-form-item label="SMTP username">
          <n-input placeholder="Please enter the SMTP username" />
        </n-form-item>

        <n-form-item label="SMTP password">
          <n-input type="password" placeholder="Please enter the SMTP password" />
        </n-form-item>

        <n-form-item label="Mail test">
          <n-button>Mail test</n-button>
        </n-form-item>

        <div>
          <n-space>
            <n-button type="primary" @click="formSubmit">Update mail information</n-button>
          </n-space>
        </div>
      </n-form>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, toRefs } from 'vue';
  import { useMessage } from 'naive-ui';

  const rules = {
    originator: {
      required: true,
      message: 'Please enter a sender mailbox',
      trigger: 'blur',
    },
  };
  export default defineComponent({
    setup() {
      const formRef: any = ref(null);
      const message = useMessage();

      const state = reactive({
        formValue: {
          originator: '',
        },
      });

      function formSubmit() {
        formRef.value.validate((errors) => {
          if (!errors) {
            message.success('Verification success');
          } else {
            message.error('Verification failed, please fill in the full information');
          }
        });
      }

      return {
        formRef,
        ...toRefs(state),
        rules,
        formSubmit,
      };
    },
  });
</script>
