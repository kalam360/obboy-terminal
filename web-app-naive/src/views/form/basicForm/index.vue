<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="Based on the form">
        Form is used to collect or verify the information from the user pages, basic form is common in less data item form.The label for the field can also support response type.
      </n-card>
    </div>
    <n-card :bordered="false" class="mt-4 proCard">
      <n-grid cols="1 s:1 m:3 l:3 xl:3 2xl:3" responsive="screen">
        <n-grid-item offset="0 s:0 m:1 l:1 xl:1 2xl:1">
          <n-form
            :label-width="80"
            :model="formValue"
            :rules="rules"
            label-placement="left"
            ref="formRef"
            class="py-8"
          >
            <n-form-item label="Reservation name 1" path="name">
              <n-input v-model:value="formValue.name" placeholder="Enter the name" />
            </n-form-item>
            <n-form-item label="The reservation number" path="mobile">
              <n-input placeholder="The phone number" v-model:value="formValue.mobile" />
            </n-form-item>
            <n-form-item label="To make an appointment time" path="datetime">
              <n-date-picker type="datetime" v-model:value="formValue.datetime" />
            </n-form-item>
            <n-form-item label="Doctor's appointments" path="doctor">
              <n-select
                placeholder="Please select a doctor's appointments"
                :options="doctorList"
                v-model:value="formValue.doctor"
              />
            </n-form-item>
            <n-form-item label="To make an appointment matters" path="matter">
              <n-select
                placeholder="Please select an appointment matters"
                :options="matterList"
                v-model:value="formValue.matter"
                multiple
              />
            </n-form-item>
            <n-form-item label="gender" path="sex">
              <n-radio-group v-model:value="formValue.sex" name="sex">
                <n-space>
                  <n-radio :value="1">male</n-radio>
                  <n-radio :value="2">female</n-radio>
                </n-space>
              </n-radio-group>
            </n-form-item>
            <n-form-item label="To make an appointment note" path="remark">
              <n-input
                v-model:value="formValue.remark"
                type="textarea"
                placeholder="Please enter the booking note"
              />
            </n-form-item>
            <n-form-item label="The picture" path="img">
              <BasicUpload
                :action="`${uploadUrl}/v1.0/files`"
                :headers="uploadHeaders"
                :data="{ type: 0 }"
                name="files"
                :width="100"
                :height="100"
                @uploadChange="uploadChange"
                v-model:value="uploadList"
                helpText="A single file of no more than 20 MB, most can only upload 10 files"
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

  const matterList = [
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
  ];

  const doctorList = [
    {
      label: 'Dr. Li',
      value: 1,
    },
    {
      label: 'Wagon',
      value: 2,
    },
    {
      label: 'Dr. Zhang',
      value: 3,
    },
  ];

  const rules = {
    name: {
      required: true,
      message: 'Please enter an appointment name',
      trigger: 'blur',
    },
    remark: {
      required: true,
      message: 'Please enter an appointment note',
      trigger: 'blur',
    },
    mobile: {
      required: true,
      message: 'Please enter an appointment phone number',
      trigger: ['input'],
    },
    datetime: {
      required: true,
      type: 'number',
      message: 'Please select an appointment time',
      trigger: ['blur', 'change'],
    },
    doctor: {
      required: true,
      type: 'number',
      message: 'Please choose a reservation doctor',
      trigger: 'change',
    },
  };

  const formRef: any = ref(null);
  const message = useMessage();
  const { uploadUrl } = globSetting;

  const defaultValueRef = () => ({
    name: '',
    mobile: '',
    remark: '',
    sex: 1,
    matter: null,
    doctor: null,
    datetime: [],
  });

  let formValue = reactive(defaultValueRef());
  const uploadList = ref([
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  ]);
  const uploadHeaders = reactive({
    platform: 'miniPrograms',
    timestamp: new Date().getTime(),
    token: 'Q6fFCuhc1vkKn5JNFWaCLf6gRAc5n0LQHd08dSnG4qo=',
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

  function resetForm() {
    formRef.value.restoreValidation();
    formValue = Object.assign(unref(formValue), defaultValueRef());
  }

  function uploadChange(list: string[]) {
    console.log(list);
  }
</script>
