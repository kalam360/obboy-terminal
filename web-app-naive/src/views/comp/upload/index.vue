<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="To upload pictures"> Upload pictures, used to collect image information from the user</n-card>
    </div>
    <n-card :bordered="false" class="mt-4 proCard">
      <n-grid cols="2 s:1 m:3 l:3 xl:3 2xl:3" responsive="screen">
        <n-grid-item offset="0 s:0 m:1 l:1 xl:1 2xl:1">
          <n-form
            :label-width="80"
            :model="formValue"
            :rules="rules"
            label-placement="left"
            ref="formRef"
            class="py-8"
          >
            <n-form-item label="Reservation name" path="name">
              <n-input v-model:value="formValue.name" placeholder="Enter the name" />
            </n-form-item>
            <n-form-item label="The reservation number" path="mobile">
              <n-input placeholder="The phone number" v-model:value="formValue.mobile" />
            </n-form-item>

            <n-form-item label="Cases of pictures" path="images">
              <BasicUpload
                :action="`${uploadUrl}/v1.0/files`"
                :headers="uploadHeaders"
                :data="{ type: 0 }"
                name="files"
                :width="100"
                :height="100"
                @uploadChange="uploadChange"
                v-model:value="formValue.images"
                helpText="A single file of no more than 2 MB, most can only upload 10 files"
              />
            </n-form-item>
            <div style="margin-left: 80px">
              <n-space>
                <n-button type="primary" @click="formSubmit">Submit an appointment</n-button>
                <n-button @click="resetForm">Reset</n-button>
              </n-space>
            </div>
          </n-form>
        </n-grid-item>
      </n-grid>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, unref, reactive } from 'vue';
  import { useMessage } from 'naive-ui';
  import { BasicUpload } from '@/components/Upload';
  import { useGlobSetting } from '@/hooks/setting';

  const globSetting = useGlobSetting();

  const rules = {
    name: {
      required: true,
      message: 'Please enter the reservation name',
      trigger: 'blur',
    },
    remark: {
      required: true,
      message: 'Please enter the booking note',
      trigger: 'blur',
    },
    images: {
      required: true,
      type: 'array',
      message: 'Case please upload pictures',
      trigger: 'change',
    },
  };

  const formRef: any = ref(null);
  const message = useMessage();
  const { uploadUrl } = globSetting;

  const formValue = reactive({
    name: '',
    mobile: '',
    //The absolute path to the image list is usually used to view and edit | relative path
    images: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'],
  });

  const uploadHeaders = reactive({
    platform: 'miniPrograms',
    timestamp: new Date().getTime(),
    token: 'Q6fFCuhc1vkKn5JNFWaCLf6gRAc5n0LQHd08dSnG4qo=',
  });

  function formSubmit() {
    formRef.value.validate((errors) => {
      if (!errors) {
        message.success('Authentication is successful');
      } else {
        message.error('Authentication failed, please fill in complete information');
      }
    });
  }

  function resetForm() {
    formRef.value.restoreValidation();
  }

  function uploadChange(list: string[]) {
    formValue.images = unref(list);
  }
</script>
