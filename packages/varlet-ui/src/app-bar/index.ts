import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import AppBar from './AppBar.vue'
import { props as appBarProps } from './props'

withInstall(AppBar)
withPropsDefaultsSetter(AppBar, appBarProps)

export { appBarProps }

export const _AppBarComponent = AppBar

export default AppBar
