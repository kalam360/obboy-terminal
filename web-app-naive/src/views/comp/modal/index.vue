<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="模态框">
        Modal Dialog to collect or display information to the user, Modal USES the Dialog presupposition, expand the drag effect
        <br />
        The following is a useModal
, ref, also support, use and other components, such as: modalRef. Value. CloseModal ()
      </n-card>
    </div>
    <n-card :bordered="false" class="proCard mt-4">
      <n-alert title="Modal nested Form" type="info">
        Using useModal popup window display and operation, and demonstrates in the Modal and the Form components, use a combination of methods
      </n-alert>
      <n-divider />
      <n-space>
        <n-button type="primary" @click="showModal">Open the Modal nested Form example</n-button>
      </n-space>
      <n-divider />
      <n-alert title="Personalized lightweight" type="info">
        Using useModal popup window display and operation, custom configuration, realize the effect of lightweight, more configuration, please refer to the document
      </n-alert>
      <n-divider />
      <n-space>
        <n-button type="primary" @click="showLightModal">Lightweight confirmation</n-button>
      </n-space>
      <n-divider />
      <n-alert title="prompt" type="info">
       Component exposes, setProps method, used to modify the internal components
Props, such as title, such as, the specific reference UI framework document, DialogReactive Properties
      </n-alert>
    </n-card>

    <basicModal @register="modalRegister" ref="modalRef" class="basicModal" @on-ok="okModal">
      <template #default>
        <BasicForm @register="register" @reset="handleReset" class="basicForm">
          <template #statusSlot="{ model, field }">
            <n-input v-model:value="model[field]" />
          </template>
        </BasicForm>
      </template>
    </basicModal>

    <basicModal
      @register="lightModalRegister"
      class="basicModalLight"
      ref="modalRef"
      @on-ok="lightOkModal"
    >
      <template #default>
        <p class="text-gray-500" style="padding-left: 35px">Some of the dialog content</p>
      </template>
    </basicModal>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, toRefs } from 'vue';
  import { useMessage } from 'naive-ui';
  import { basicModal, useModal } from '@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '@/components/Form/index';

  const schemas: FormSchema[] = [
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
      //slot
      slot: 'statusSlot',
    },
  ];

  export default defineComponent({
    components: { basicModal, BasicForm },
    setup() {
      const modalRef: any = ref(null);
      const message = useMessage();

      const [modalRegister, { openModal, closeModal, setSubLoading }] = useModal({
        title: 'New booking',
      });

      const [
        lightModalRegister,
        {
          openModal: lightOpenModal,
          closeModal: lightCloseModal,
          setSubLoading: lightSetSubLoading,
        },
      ] = useModal({
        title: 'Confirmation dialog',
        showIcon: true,
        type: 'warning',
        closable: false,
        maskClosable: true,
      });

      const [register, { submit }] = useForm({
        gridProps: { cols: 1 },
        collapsedRows: 3,
        labelWidth: 120,
        layout: 'horizontal',
        submitButtonText: 'Submit the booking',
        showActionButtonGroup: false,
        schemas,
      });

      const state = reactive({
        formValue: {
          name: 'Mr Ma',
        },
      });

      async function okModal() {
        const formRes = await submit();
        if (formRes) {
          closeModal();
          message.success('Submitted successfully');
        } else {
          message.error('Authentication failed, please fill in complete information');
          setSubLoading(false);
        }
      }

      function lightOkModal() {
        lightCloseModal();
        lightSetSubLoading();
      }

      function showLightModal() {
        lightOpenModal();
      }

      function showModal() {
        openModal();
      }

      function handleReset(values: Recordable) {
        console.log(values);
      }

      return {
        ...toRefs(state),
        modalRef,
        register,
        modalRegister,
        lightModalRegister,
        handleReset,
        showModal,
        okModal,
        lightOkModal,
        showLightModal,
      };
    },
  });
</script>

<style lang="less">
  .basicForm {
    padding-top: 20px;
  }

  .n-dialog.basicModal {
    width: 640px;
  }

  .n-dialog.basicModalLight {
    width: 416px;
    padding-top: 26px;
  }
</style>
