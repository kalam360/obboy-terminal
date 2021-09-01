// @ts-ignore
import { NButton } from 'naive-ui';
import { PermissionsEnum } from '@/enums/permissionsEnum';
// @ts-ignore
export interface ActionItem extends NButton.props {
  onClick?: Fn;
  label?: string;
  color?: 'success' | 'error' | 'warning';
  icon?: string;
  popConfirm?: PopConfirm;
  disabled?: boolean;
  divider?: boolean;
  // Permission coding control is displayed
  auth?: PermissionsEnum | PermissionsEnum[] | string | string[];
  // Whether business control is displayed
  ifShow?: boolean | ((action: ActionItem) => boolean);
}

export interface PopConfirm {
  title: string;
  okText?: string;
  cancelText?: string;
  confirm: Fn;
  cancel?: Fn;
  icon?: string;
}
