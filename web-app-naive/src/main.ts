import './styles/tailwind.css';
import { createApp } from 'vue';
import App from './App.vue';
import router, { setupRouter } from './router';
import { setupStore } from '@/store';
import MakeitCaptcha from 'makeit-captcha';
import 'makeit-captcha/dist/captcha.min.css';
import { setupNaive, setupDirectives } from '@/plugins';
import { AppProvider } from '@/components/Application';

async function bootstrap() {
  const appProvider = createApp(AppProvider);

  const app = createApp(App);

  app.use(MakeitCaptcha);

  // Registered global common naive - UI components
  setupNaive(app);

  // 注册全局自定义组件
  //setupCustomComponents();

  // 注册全局自定义指令，如：v-permission权限指令
  setupDirectives(app);

  // 注册全局方法，如：app.config.globalProperties.$message = message
  //setupGlobalMethods(app);

  // 挂载状态管理
  setupStore(app);

  // priority to mount the Provider to solve routing guard, can be used in the Axios, Dialog, such as Message, etc
  appProvider.mount('#appProvider', true);

  // Mount the routing
  await setupRouter(app);

  // Mount the APP instance after routing is ready
  await router.isReady();

  app.mount('#app', true);
}

void bootstrap();
