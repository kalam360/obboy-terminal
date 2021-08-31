import type { RouteRecordRaw, RouteMeta } from 'vue-router';
import { defineComponent } from 'vue';

export type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string;
  meta: RouteMeta;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Recordable;
  fullPath?: string;
}

export interface Meta {
  // The name of the
  title: string;
  // Whether to ignore permissions
  ignoreAuth?: boolean;
  permissions?: string[];
  // If no cache
  noKeepAlive?: boolean;
  // Whether on the TAB
  affix?: boolean;
  // Icon on the TAB
  icon?: string;
  // Jump address
  frameSrc?: string;
  // Outside the chain jump address
  externalLink?: string;
}
