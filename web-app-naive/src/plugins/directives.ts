import { App } from 'vue';

import { permission } from '@/directives/permission';

/**
 * Register global custom instruction
 * @param app
 */
export function setupDirectives(app: App) {
  // Permission Control Directive (Demo)
  app.directive('permission', permission);
}
