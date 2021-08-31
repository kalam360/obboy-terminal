<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="Based on the form"> UseForm form, used to collect the form from the user information </n-card>
    </div>
    <n-card :bordered="false" class="mt-4 proCard">
      <div class="BasicForm">
        <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset">
          <template #statusSlot="{ model, field }">
            <n-input v-model:value="model[field]" />
          </template>
        </BasicForm>
      </div>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { BasicForm, useForm } from '@/components/Form/index';
  import { useMessage } from 'naive-ui';

  const schemas = [
    {
      field: 'name',
      component: 'NInput',
      label: 'The name',
      labelMessage: 'This is a hint',
      giProps: {
        span: 1,
      },
      componentProps: {
        placeholder: 'Please enter your name',
        onInput: (e: any) => {
          console.log(e);
        },
      },
      rules: [{ required: true, message: 'Please enter your name', trigger: ['blur'] }],
    },
    {
      field: 'mobile',
      component: 'NInputNumber',
      label: 'Mobile phone',
      componentProps: {
        placeholder: 'Please enter the phone number',
        showButton: false,
        onInput: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'type',
      component: 'NSelect',
      label: 'type',
      giProps: {
        //span: 24,
      },
      componentProps: {
        placeholder: 'Please select the type',
        options: [
          {
            label: 'comfort',
            value: 1,
          },
          {
            label: 'economy',
            value: 2,
          },
        ],
        onUpdateValue: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'makeDate',
      component: 'NDatePicker',
      label: 'To make an appointment time',
      giProps: {
        //span: 24,
      },
      componentProps: {
        type: 'date',
        clearable: true,
        defaultValue: 1183135260000,
        onUpdateValue: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'makeTime',
      component: 'NTimePicker',
      label: 'Residence time',
      giProps: {
        //span: 24,
      },
      componentProps: {
        clearable: true,
        onUpdateValue: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'makeProject',
      component: 'NCheckbox',
      label: 'Make an appointment to project',
      giProps: {
        //span: 24,
      },
      componentProps: {
        placeholder: 'Please select a booking',
        options: [
          {
            label: 'Kind of teeth',
            value: 1,
          },
          {
            label: 'fillings',
            value: 2,
          },
          {
            label: 'Root canal',
            value: 3,
          },
        ],
        onUpdateChecked: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'makeSource',
      component: 'NRadioGroup',
      label: 'source',
      giProps: {
        //span: 24,
      },
      componentProps: {
        options: [
          {
            label: 'online',
            value: 1,
          },
          {
            label: 'stores',
            value: 2,
          },
        ],
        onUpdateChecked: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'status',
      label: 'state',
      giProps: {
        //span: 24,
      },
      //插槽
      slot: 'statusSlot',
    },
  ];

  const message = useMessage();

  const [register, {}] = useForm({
    gridProps: { cols: 1 },
    collapsedRows: 3,
    labelWidth: 120,
    layout: 'horizontal',
    submitButtonText: 'Submit the booking',
    schemas,
  });

  function handleSubmit(values: Recordable) {
    console.log(values);
    message.success(JSON.stringify(values));
  }

  function handleReset(values: Recordable) {
    console.log(values);
  }
</script>

<style lang="less" scoped>
  .BasicForm {
    width: 550px;
    margin: 0 auto;
    overflow: hidden;
    padding-top: 20px;
  }
</style>
