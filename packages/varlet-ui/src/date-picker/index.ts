import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import DatePicker from './DatePicker.vue'
import { props as datePickerProps } from './props'

withInstall(DatePicker)
withPropsDefaultsSetter(DatePicker, datePickerProps)

export { datePickerProps }

export const _DatePickerComponent = DatePicker

export default DatePicker
