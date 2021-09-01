<template>
  <n-card :bordered="false" class="proCard">
    <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset">
      <template #statusSlot="{ model, field }">
        <n-input v-model:value="model[field]" />
      </template>
    </BasicForm>

    <BasicTable
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row) => row.id"
      ref="actionRef"
      :actionColumn="actionColumn"
      @update:checked-row-keys="onCheckedRow"
      :scroll-x="1090"
    >
      <template #tableTitle>
        <n-button type="primary" @click="addTable">
          <template #icon>
            <n-icon>
              <PlusOutlined />
            </n-icon>
          </template>
          New construction
        </n-button>
      </template>

      <template #toolbar>
        <n-button type="primary" @click="reloadTable">Refresh data</n-button>
      </template>
    </BasicTable>

    <n-modal v-model:show="showModal" :show-icon="false" preset="dialog" title="新建">
      <n-form
        :model="formParams"
        :rules="rules"
        ref="formRef"
        label-placement="left"
        :label-width="80"
        class="py-4"
      >
        <n-form-item label="name" path="name">
          <n-input placeholder="Please enter the name" v-model:value="formParams.name" />
        </n-form-item>
        <n-form-item label="address" path="address">
          <n-input type="textarea" placeholder="Please enter your address" v-model:value="formParams.address" />
        </n-form-item>
        <n-form-item label="date" path="date">
          <n-date-picker type="datetime" placeholder="Please select a date" v-model:value="formParams.date" />
        </n-form-item>
      </n-form>

      <template #action>
        <n-space>
          <n-button @click="() => (showModal = false)">Cancel</n-button>
          <n-button type="info" :loading="formBtnLoading" @click="confirmForm">Sure</n-button>
        </n-space>
      </template>
    </n-modal>
  </n-card>
</template>

<script lang="ts" setup>
  import { h, reactive, ref } from 'vue';
  import { useMessage } from 'naive-ui';
  import { BasicTable, TableAction } from '@/components/Table';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { getTableList } from '@/api/table/list';
  import { columns } from './columns';
  import { PlusOutlined } from '@vicons/antd';
  import { useRouter } from 'vue-router';

  const rules = {
    name: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Please enter the name',
    },
    address: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Please enter your address',
    },
    date: {
      type: 'number',
      required: true,
      trigger: ['blur', 'change'],
      message: 'Please select a date',
    },
  };

  const schemas = [
    {
      field: 'name',
      labelMessage: 'This is a prompt',
      component: 'NInput',
      label: 'Name',
      componentProps: {
        placeholder: 'Please type in your name',
        onInput: (e: any) => {
          console.log(e);
        },
      },
      rules: [{ required: true, message: 'Please type in your name', trigger: ['blur'] }],
    },
    {
      field: 'mobile',
      component: 'NInputNumber',
      label: '手机',
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
      componentProps: {
        placeholder: 'Please choose the type',
        options: [
          {
            label: 'Comfort',
            value: 1,
          },
          {
            label: 'Economy',
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
      label: 'Appointment',
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
      label: 'Stay time',
      componentProps: {
        clearable: true,
        onUpdateValue: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'status',
      label: 'state',
      //插槽
      slot: 'statusSlot',
    },
    {
      field: 'makeProject',
      component: 'NCheckbox',
      label: 'Appointment project',
      componentProps: {
        placeholder: 'Please select an appointment project',
        options: [
          {
            label: 'Dental implants',
            value: 1,
          },
          {
            label: 'Fill your teeth',
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
      componentProps: {
        options: [
          {
            label: 'Online',
            value: 1,
          },
          {
            label: 'Store',
            value: 2,
          },
        ],
        onUpdateChecked: (e: any) => {
          console.log(e);
        },
      },
    },
  ];

  const router = useRouter();
  const formRef: any = ref(null);
  const message = useMessage();
  const actionRef = ref();

  const showModal = ref(false);
  const formBtnLoading = ref(false);
  const formParams = reactive({
    name: '',
    address: '',
    date: null,
  });

  const params = ref({
    pageSize: 5,
    name: 'xiaoMa',
  });

  const actionColumn = reactive({
    width: 220,
    title: 'operate',
    key: 'action',
    fixed: 'right',
    render(record) {
      return h(TableAction as any, {
        style: 'button',
        actions: [
          {
            label: 'delete',
            icon: 'ic:outline-delete-outline',
            onClick: handleDelete.bind(null, record),
            // Whether the business control is displayed isShow And auth is related to
            ifShow: () => {
              return true;
            },
            // Whether the permission control is displayed: there is permission, it will be displayed, support multiple
            auth: ['basic_list'],
          },
          {
            label: 'edit',
            onClick: handleEdit.bind(null, record),
            ifShow: () => {
              return true;
            },
            auth: ['basic_list'],
          },
        ],
        dropDownActions: [
          {
            label: 'Enable',
            key: 'enabled',
            // Whether the business control is displayed: the not displayed button of the non-enable status
            ifShow: () => {
              return true;
            },
          },
          {
            label: 'Disable',
            key: 'disabled',
            ifShow: () => {
              return true;
            },
          },
        ],
        select: (key) => {
          message.info(`You click,${key} Button`);
        },
      });
    },
  });

  const [register, {}] = useForm({
    gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
    labelWidth: 80,
    schemas,
  });

  function addTable() {
    showModal.value = true;
  }

  const loadDataTable = async (res) => {
    return await getTableList({...res, ...formParams, ...params.value});
  };

  function onCheckedRow(rowKeys) {
    console.log(rowKeys);
  }

  function reloadTable() {
    actionRef.value.reload();
  }

  function confirmForm(e) {
    e.preventDefault();
    formBtnLoading.value = true;
    formRef.value.validate((errors) => {
      if (!errors) {
        message.success('New success');
        setTimeout(() => {
          showModal.value = false;
          reloadTable();
        });
      } else {
        message.error('Please fill in the full information');
      }
      formBtnLoading.value = false;
    });
  }

  function handleEdit(record: Recordable) {
    console.log('Click to edit', record);
    router.push({ name: 'basic-info', params: { id: record.id } });
  }

  function handleDelete(record: Recordable) {
    console.log('Click to delete', record);
    message.info('Click to delete');
  }

  function handleSubmit(values: Recordable) {
    console.log(values);
    reloadTable();
  }

  function handleReset(values: Recordable) {
    console.log(values);
  }
</script>

<style lang="less" scoped></style>
