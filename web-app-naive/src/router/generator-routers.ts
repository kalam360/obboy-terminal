import { adminMenus } from '@/api/system/menu';
import { constantRouterIcon } from './router-icons';
import router from '@/router/index';
import { constantRouter } from '@/router/index';
import { RouteRecordRaw } from 'vue-router';
import { Layout, ParentLayout } from '@/router/constant';
import type { AppRouteRecordRaw } from '@/router/types';

const Iframe = () => import('@/views/iframe/index.vue');
const LayoutMap = new Map<string, () => Promise<typeof import('*.vue')>>();

LayoutMap.set('LAYOUT', Layout);
LayoutMap.set('IFRAME', Iframe);

/**
 * Formatting the back-end structure information and recursive generates hierarchical routing table
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const routerGenerator = (routerMap, parent?): any[] => {
  return routerMap.map((item) => {
    const currentRouter: any = {
      // Dynamic splicing generation such as routing address/dashboard/workplace
      path: `${(parent && parent.path) || ''}/${item.path}`,
      // Name of routing, it is recommended that only一
      name: item.name || '',
      // We should by the corresponding component of the page
      component: item.component,
      // meta: The page title, menu icon, page access () may be removed for instruction permissions,
      meta: {
        ...item.meta,
        label: item.meta.title,
        icon: constantRouterIcon[item.meta.icon] || null,
        permissions: item.meta.permissions || null,
      },
    };

    // In order to prevent the back-end to return the result is not standard, handling likely joining together the two backslashes
    currentRouter.path = currentRouter.path.replace('//', '/');
    // redirect
    item.redirect && (currentRouter.redirect = item.redirect);
    // Is there a submenu, and recursive processing
    if (item.children && item.children.length > 0) {
      //If you do not define default by the first zi lu is redirect redirect
      !item.redirect && (currentRouter.redirect = `${item.path}/${item.children[0].path}`);
      // recursive
      currentRouter.children = routerGenerator(item.children, currentRouter);
    }
    return currentRouter;
  });
};

/**
 * Dynamically generated menu
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = (): Promise<RouteRecordRaw[]> => {
  return new Promise((resolve, reject) => {
    adminMenus()
      .then((result) => {
        const routeList = routerGenerator(result);
        asyncImportRoute(routeList);
        const asyncRoutesList = [...routeList, ...constantRouter];
        asyncRoutesList.forEach((item) => {
          router.addRoute(item);
        });
        resolve(asyncRoutesList);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * Find the views of the corresponding component files
 * */
let viewsModules: Record<string, () => Promise<Recordable>>;
export const asyncImportRoute = (routes: AppRouteRecordRaw[] | undefined): void => {
  viewsModules = viewsModules || import.meta.glob('../views/**/*.{vue,tsx}');
  if (!routes) return;
  routes.forEach((item) => {
    if (!item.component && item.meta?.frameSrc) {
      item.component = 'IFRAME';
    }
    const { component, name } = item;
    const { children } = item;
    if (component) {
      const layoutFound = LayoutMap.get(component as string);
      if (layoutFound) {
        item.component = layoutFound;
      } else {
        item.component = dynamicImport(viewsModules, component as string);
      }
    } else if (name) {
      item.component = ParentLayout;
    }
    children && asyncImportRoute(children);
  });
};

/**
 * Dynamic import
 * */
export const dynamicImport = (
  viewsModules: Record<string, () => Promise<Recordable>>,
  component: string
) => {
  const keys = Object.keys(viewsModules);
  const matchKeys = keys.filter((key) => {
    let k = key.replace('../views', '');
    const lastIndex = k.lastIndexOf('.');
    k = k.substring(0, lastIndex);
    return k === component;
  });
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return viewsModules[matchKey];
  }
  if (matchKeys?.length > 1) {
    console.warn(
      'Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure'
    );
    return;
  }
};
