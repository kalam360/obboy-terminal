<template>
  <n-grid cols="2 s:2 m:2 l:3 xl:3 2xl:3" responsive="screen">
    <n-grid-item>
      <n-form :label-width="120" :model="formValue" :rules="rules" ref="formRef">
        <n-form-item label="product picture(Big)">
          <n-space align="center">
            <span>width:</span>
            <n-input
              v-model:value="formValue.bigWidth"
              style="width: 80px"
              placeholder="Width pixel"
            />
            <span>high:</span>
            <n-input
              v-model:value="formValue.bigHeight"
              style="width: 80px"
              placeholder="Height pixel"
            />
          </n-space>
        </n-form-item>

        <n-form-item label="product picture(small)">
          <n-space align="center">
            <span>width:</span>
            <n-input
              v-model:value="formValue.smallWidth"
              style="width: 80px"
              placeholder="Width pixel"
            />
            <span>high:</span>
            <n-input
              v-model:value="formValue.smallHeight"
              style="width: 80px"
              placeholder="Height pixel"
            />
          </n-space>
        </n-form-item>

        <n-form-item label="Watermark transparency" path="watermarkClarity">
          <n-input-number
            v-model:value="formValue.watermarkClarity"
            :show-button="false"
            placeholder="Please enter watermark transparency"
          />
        </n-form-item>

        <n-form-item label="Watermark picture" path="watermarkClarity">
          <n-upload action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f">
            <n-button>upload files</n-button>
          </n-upload>
        </n-form-item>

        <n-form-item label="Watermark location" path="watermarkPlace">
          <n-select
            placeholder="Please choose a price exact way"
            :options="watermarkPlaceList"
            v-model:value="formValue.watermarkPlace"
          />
        </n-form-item>

        <n-form-item label="Prices accurate number" path="pricePreciseNum">
          <n-select
            placeholder="Please select a price exact bit number"
            :options="pricePreciseNumList"
            v-model:value="formValue.pricePreciseNum"
          />
        </n-form-item>

        <n-form-item label="Expected method" path="pricePrecise">
          <n-select
            placeholder="Please choose a price exact way"
            :options="pricePreciseList"
            v-model:value="formValue.pricePrecise"
          />
        </n-form-item>

        <n-form-item label="The front desk shows the market price" path="isMarketPrice">
          <n-switch size="large" v-model:value="formValue.isMarketPrice" />
        </n-form-item>

        <div>
          <n-space>
            <n-button type="primary" @click="formSubmit">Update display information</n-button>
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
  const watermarkPlaceList = [
    {
      label: 'Upper left',
      value: 1,
    },
    {
      label: 'Upper right',
      value: 2,
    },
    {
      label: 'Center',
      value: 3,
    },
    {
      label: 'Lower right',
      value: 4,
    },
  ];

  const pricePreciseNumList = [
    {
      label: '2',
      value: 1,
    },
    {
      label: '3-bit',
      value: 2,
    },
    {
      label: '4 bit',
      value: 3,
    },
  ];
  const pricePreciseList = [
    {
      label: 'rounding',
      value: 1,
    },
    {
      label: 'Rounded up',
      value: 2,
    },
    {
      label: 'Come down',
      value: 3,
    },
  ];

  export default defineComponent({
    setup() {
      const formRef: any = ref(null);
      const message = useMessage();
      const dialog = useDialog();

      const state = reactive({
        formValue: {
          bigWidth: '',
          bigHeight: '',
          smallWidth: '',
          smallHeight: '',
          watermarkClarity: null,
          pricePrecise: 1,
          isMarketPrice: true,
          pricePreciseNum: null,
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
        pricePreciseList,
        watermarkPlaceList,
        pricePreciseNumList,
        rules,
        formSubmit,
        resetForm,
        systemOpenChange,
      };
    },
  });
</script>
