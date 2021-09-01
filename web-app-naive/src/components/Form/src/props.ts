import type { CSSProperties, PropType } from 'vue';
import { FormSchema } from './types/form';
import type { GridProps, GridItemProps } from 'naive-ui/lib/grid';
import type { ButtonProps } from 'naive-ui/lib/button';
import { propTypes } from '@/utils/propTypes';
export const basicProps = {
  // 标签宽度  FLabel width width
  labelWidth: {
    type: [Number, String] as PropType<number | string>,
    default: 80,
  },
  //Form configuration rule
  schemas: {
    type: [Array] as PropType<FormSchema[]>,
    default: () => [],
  },
  //Layout method
  layout: {
    type: String,
    default: 'inline',
  },
  //Whether to show the in-line form
  inline: {
    type: Boolean,
    default: false,
  },
  //size
  size: {
    type: String,
    default: 'medium',
  },
  //Label location
  labelPlacement: {
    type: String,
    default: 'left',
  },
  //Component WIDTH 100%
  isFull: {
    type: Boolean,
    default: true,
  },
  //Whether to display an operation button (inquiry/Reset)
  showActionButtonGroup: propTypes.bool.def(true),
  // Display reset button
  showResetButton: propTypes.bool.def(true),
  //Reset button configuration
  resetButtonOptions: Object as PropType<Partial<ButtonProps>>,
  // Show confirmation button
  showSubmitButton: propTypes.bool.def(true),
  // Confirm button configuration
  submitButtonOptions: Object as PropType<Partial<ButtonProps>>,
  //Expand Collapse button
  showAdvancedButton: propTypes.bool.def(true),
  // Confirm button text
  submitButtonText: {
    type: String,
    default: 'Inquire',
  },
  //Reset button text
  resetButtonText: {
    type: String,
    default: 'Reset',
  },
  //grid Configure
  gridProps: Object as PropType<GridProps>,
  //GI configuration
  giProps: Object as PropType<GridItemProps>,
  //grid style
  baseGridStyle: {
    type: Object as PropType<CSSProperties>,
  },
  //Whether it is folded
  collapsed: {
    type: Boolean,
    default: false,
  },
  //The number of rows of default display
  collapsedRows: {
    type: Number,
    default: 1,
  },
};
