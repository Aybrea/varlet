import { VNode } from 'vue'
import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export declare const pullRefreshProps: Record<keyof PullRefreshProps, any>

export interface PullRefreshProps extends BasicAttributes {
  modelValue?: boolean
  disabled?: boolean
  animationDuration?: number | string
  successDuration?: number | string
  bgColor?: string
  successBgColor?: string
  color?: string
  successColor?: string
  target?: string | HTMLElement
  onRefresh?: ListenerProp<() => void>
  'onUpdate:modelValue'?: ListenerProp<(value: boolean) => void>
}

export class PullRefresh extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<PullRefreshProps>

  $props: PullRefreshProps

  $slots: {
    default(): VNode[]
  }
}

export class _PullRefreshComponent extends PullRefresh {}
