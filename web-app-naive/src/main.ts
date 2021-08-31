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

  // Registered global custom components
  //setupCustomComponents();

  // Registered global custom commands, such as: v-Permission to access directives
  setupDirectives(app);

  // Global registration methods, such as: app.config.globalProperties.$message = message
  //setupGlobalMethods(app);

  // Mount the state management
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
