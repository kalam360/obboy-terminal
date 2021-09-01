<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="Role permission management">
        Page data is Mock Example data, non-true data.
      </n-card>
    </div>
    <n-card :bordered="false" class="mt-4 proCard">
      <BasicTable
        :columns="columns"
        :request="loadDataTable"
        :row-key="(row) => row.id"
        ref="actionRef"
        :actionColumn="actionColumn"
        @update:checked-row-keys="onCheckedRow"
      >
        <template #tableTitle>
          <n-button type="primary">
            <template #icon>
              <n-icon>
                <PlusOutlined />
              </n-icon>
            </template>
            Add role
          </n-button>
        </template>

        <template #action>
          <TableAction />
        </template>
      </BasicTable>
    </n-card>

    <n-modal v-model:show="showModal" :show-icon="false" preset="dialog" :title="editRoleTitle">
      <div class="py-3 menu-list">
        <n-tree
          block-line
          cascade
          checkable
          :virtual-scroll="true"
          :data="treeData"
          :expandedKeys="expandedKeys"
          :checked-keys="checkedKeys"
          style="max-height: 950px; overflow: hidden"
          @update:checked-keys="checkedTree"
        />
      </div>
      <template #action>
        <n-space>
          <n-button type="info" ghost icon-placement="left" @click="packHandle">
            all{{ expandedKeys.length ? 'Put away' : 'Expand' }}
          </n-button>

          <n-button type="info" ghost icon-placement="left" @click="checkedAllHandle">
            all{{ checkedAll ? 'Cancel' : 'choose' }}
          </n-button>
          <n-button type="primary" :loading="formBtnLoading" @click="confirmForm">submit</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, unref, h, onMounted } from 'vue';
  import { useMessage } from 'naive-ui';
  import { BasicTable, TableAction } from '@/components/Table';
  import { getRoleList } from '@/api/system/role';
  import { getMenuList } from '@/api/system/menu';
  import { columns } from './columns';
  import { PlusOutlined } from '@vicons/antd';
  import { getTreeAll } from '@/utils';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const formRef: any = ref(null);
  const message = useMessage();
  const actionRef = ref();

  const showModal = ref(false);
  const formBtnLoading = ref(false);
  const checkedAll = ref(false);
  const editRoleTitle = ref('');
  const treeData = ref([]);
  const expandedKeys = ref([]);
  const checkedKeys = ref(['console', 'step-form']);

  const params = reactive({
    pageSize: 5,
    name: 'xiaoMa',
  });

  const actionColumn = reactive({
    width: 250,
    title: 'operate',
    key: 'action',
    fixed: 'right',
    render(record) {
      return h(TableAction, {
        style: 'button',
        actions: [
          {
            label: 'Menu permission',
            onClick: handleMenuAuth.bind(null, record),
            // Whether the business control is displayed is ISSHOW and AUTH and the relationship
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
          {
            label: 'delete',
            icon: 'ic:outline-delete-outline',
            onClick: handleDelete.bind(null, record),
            // Whether the business control is displayed is ISSHOW and AUTH and the relationship
            ifShow: () => {
              return true;
            },
            // Whether the permission control is displayed: there is permission, it will be displayed, support multiple
            auth: ['basic_list'],
          },
        ],
      });
    },
  });

  const loadDataTable = async (res: any) => {
    let _params = {
      ...res,
      ...unref(params),
    };
    return await getRoleList(_params);
  };

  function onCheckedRow(rowKeys: any[]) {
    console.log(rowKeys);
  }

  function reloadTable() {
    actionRef.value.reload();
  }

  function confirmForm(e: any) {
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

  function handleMenuAuth(record: Recordable) {
    editRoleTitle.value = `distribute ${record.name} Menu permission`;
    checkedKeys.value = record.menu_keys;
    showModal.value = true;
  }

  function checkedTree(keys) {
    checkedKeys.value = [checkedKeys.value, ...keys];
  }

  function packHandle() {
    if (expandedKeys.value.length) {
      expandedKeys.value = [];
    } else {
      expandedKeys.value = treeData.value.map((item: any) => item.key) as [];
    }
  }

  function checkedAllHandle() {
    if (!checkedAll.value) {
      checkedKeys.value = getTreeAll(treeData.value);
      checkedAll.value = true;
    } else {
      checkedKeys.value = [];
      checkedAll.value = false;
    }
  }

  onMounted(async () => {
    const treeMenuList = await getMenuList();
    expandedKeys.value = treeMenuList.list.map((item) => item.key);
    treeData.value = treeMenuList.list;
  });
</script>

<style lang="less" scoped></style>
