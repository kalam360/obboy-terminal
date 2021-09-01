<template>
  <div class="view-account">
    <div class="view-account-header"></div>
    <div class="view-account-container">
      <div class="view-account-top">
        <div class="view-account-top-logo">
          <img src="~@/assets/images/account-logo.png" alt="" />
        </div>
        <div class="view-account-top-desc">NAIVE UI Admin Transportation / Design Solution</div>
      </div>
      <div class="view-account-form">
        <n-form
          ref="formRef"
          label-placement="left"
          size="large"
          :model="formInline"
          :rules="rules"
        >
          <n-form-item path="username">
            <n-input v-model:value="formInline.username" placeholder="please enter user name">
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <PersonOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input
              v-model:value="formInline.password"
              type="password"
              show-password-toggle
              placeholder="Please enter your password"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <LockClosedOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="isCaptcha">
            <div class="w-full">
              <mi-captcha width="384" theme-color="#2d8cf0" :logo="logo" @success="onAuthCode" />
            </div>
          </n-form-item>
          <n-form-item class="default-color">
            <div class="flex justify-between">
              <div class="flex-initial">
                <n-checkbox v-model:checked="autoLogin">auto login</n-checkbox>
              </div>
              <div class="flex-initial order-last">
                <a href="javascript:">forget the password</a>
              </div>
            </div>
          </n-form-item>
          <n-form-item>
            <n-button type="primary" @click="handleSubmit" size="large" :loading="loading" block>
              Log in
            </n-button>
          </n-form-item>
          <n-form-item class="default-color">
            <div class="flex view-account-other">
              <div class="flex-initial">
                <span>Other login method</span>
              </div>
              <div class="flex-initial mx-2">
                <a href="javascript:">
                  <n-icon size="24" color="#2d8cf0">
                    <LogoGithub />
                  </n-icon>
                </a>
              </div>
              <div class="flex-initial mx-2">
                <a href="javascript:">
                  <n-icon size="24" color="#2d8cf0">
                    <LogoFacebook />
                  </n-icon>
                </a>
              </div>
              <div class="flex-initial" style="margin-left: auto">
                <a href="javascript:">Register an account</a>
              </div>
            </div>
          </n-form-item>
        </n-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useUserStore } from '@/store/modules/user';
  import { useMessage } from 'naive-ui';
  import { ResultEnum } from '@/enums/httpEnum';
  import logo from '@/assets/images/logo.png';
  import { PersonOutline, LockClosedOutline, LogoGithub, LogoFacebook } from '@vicons/ionicons5';

  interface FormState {
    username: string;
    password: string;
  }

  const formRef = ref();
  const message = useMessage();
  const loading = ref(false);
  const autoLogin = ref(true);

  const formInline = reactive({
    username: 'admin',
    password: '123456',
    isCaptcha: false,
  });

  const rules = {
    username: { required: true, message: 'please enter user name', trigger: 'blur' },
    password: { required: true, message: 'Please enter your password', trigger: 'blur' },
    isCaptcha: {
      required: true,
      type: 'boolean',
      trigger: 'change',
      message: 'Please click the button to verify the verification code check',
      validator: (_, value) => value === true,
    },
  };

  const userStore = useUserStore();

  const router = useRouter();
  const route = useRoute();

  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.value.validate(async (errors) => {
      if (!errors) {
        const { username, password } = formInline;
        message.loading('logging in...');
        loading.value = true;

        const params: FormState = {
          username,
          password,
        };

        const { code, message: msg } = await userStore.login(params);

        if (code == ResultEnum.SUCCESS) {
          const toPath = decodeURIComponent((route.query?.redirect || '/') as string);
          message.success('login successful!');
          router.replace(toPath).then((_) => {
            if (route.name == 'login') {
              router.replace('/');
            }
          });
        } else {
          message.info(msg || 'Login failed');
        }
      } else {
        message.error('Please fill in the full information and verify the code verification');
      }
    });
  };

  const onAuthCode = () => {
    formInline.isCaptcha = true;
  }
</script>

<style lang="less" scoped>
  .view-account {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;

    &-container {
      flex: 1;
      padding: 32px 0;
      width: 384px;
      margin: 0 auto;
    }

    &-top {
      padding: 32px 0;
      text-align: center;

      &-desc {
        font-size: 14px;
        color: #808695;
      }
    }

    &-other {
      width: 100%;
    }

    .default-color {
      color: #515a6e;

      .ant-checkbox-wrapper {
        color: #515a6e;
      }
    }
  }

  @media (min-width: 768px) {
    .view-account {
      background-image: url('../../assets/images/login.svg');
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: 100%;
    }

    .page-account-container {
      padding: 32px 0 24px 0;
    }
  }
</style>
