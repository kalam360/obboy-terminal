import type { DialogOptions } from 'naive-ui/lib/dialog';
/**
 * @description: Method for exposing the window
 */
export interface ModalMethods {
  setProps: (props) => void;
  openModal: () => void;
  closeModal: () => void;
  setSubLoading: (status) => void;
}

/**
 * Support for modification, Dialogoptions parameter
 */
export interface ModalProps extends DialogOptions { }

export type RegisterFn = (ModalInstance: ModalMethods) => void;

export type UseModalReturnType = [RegisterFn, ModalMethods];