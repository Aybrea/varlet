import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Cell from './Cell.vue'
import { props as cellProps } from './props'

withInstall(Cell)
withPropsDefaultsSetter(Cell, cellProps)

export { cellProps }

export const _CellComponent = Cell

export default Cell
