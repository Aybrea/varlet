import { VNode, VNodeChild } from 'vue'
import {
  BasicAttributes,
  Direction as CheckboxGroupDirection,
  Rules as CheckboxGroupRules,
  ListenerProp,
  SetPropsDefaults,
  VarComponent,
} from './varComponent'

export declare const checkboxGroupProps: Record<keyof CheckboxGroupProps, any>

export type CheckboxGroupValidateTrigger = 'onChange'

export type CheckboxGroupOptionLabelRender = (option: CheckboxGroupOption, checked: boolean) => VNodeChild

export interface CheckboxGroupOption {
  label?: string | VNode | CheckboxGroupOptionLabelRender
  value?: any
  disabled?: boolean

  [key: PropertyKey]: any
}

export { CheckboxGroupDirection }

export interface CheckboxGroupProps extends BasicAttributes {
  modelValue?: any[]
  max?: string | number
  labelKey?: string
  valueKey?: string
  options?: CheckboxGroupOption[]
  direction?: CheckboxGroupDirection
  validateTrigger?: CheckboxGroupValidateTrigger[]
  rules?: CheckboxGroupRules
  onChange?: ListenerProp<(value: Array<any>) => void>
  'onUpdate:modelValue'?: ListenerProp<(value: Array<any>) => void>
}

export class CheckboxGroup extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<CheckboxGroupProps>

  $props: CheckboxGroupProps

  $slots: {
    default(): VNode[]
  }

  validate(): Promise<boolean>

  resetValidation(): void

  reset(): void

  checkAll(): any[]

  inverseAll(): any[]
}

export class _CheckboxGroupComponent extends CheckboxGroup {}
