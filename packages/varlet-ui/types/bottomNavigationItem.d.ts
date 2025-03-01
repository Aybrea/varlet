import { VNode } from 'vue'
import { BadgeProps } from './badge'
import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export declare const bottomNavigationItemProps: Record<keyof BottomNavigationItemProps, any>

export interface BottomNavigationItemProps extends BasicAttributes {
  name?: string
  icon?: string
  label?: string
  namespace?: string
  badge?: boolean | BadgeProps
  onClick?: ListenerProp<(active: string | number) => void>
}

export interface BottomNavigationItemIcon {
  active: boolean
}

export class BottomNavigationItem extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<BottomNavigationItemProps>

  $props: BottomNavigationItemProps

  $slots: {
    default(): VNode[]
    icon(data: BottomNavigationItemIcon): VNode[]
  }
}

export class _BottomNavigationItemComponent extends BottomNavigationItem {}
