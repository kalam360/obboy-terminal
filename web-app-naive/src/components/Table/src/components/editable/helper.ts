import { ComponentType } from '../../types/componentType';

/**
 * @description: Generate PlaceHolder
 */
export function createPlaceholderMessage(component: ComponentType) {
  if (component === 'NInput') return 'please enter';
  if (
    ['NPicker', 'NSelect', 'NCheckbox', 'NRadio', 'NSwitch', 'NDatePicker', 'NTimePicker'].includes(
      component
    )
  )
    return 'please choose';
  return '';
}
