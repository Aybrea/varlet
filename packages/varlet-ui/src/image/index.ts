import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Image from './Image.vue'
import { props as imageProps } from './props'

withInstall(Image)
withPropsDefaultsSetter(Image, imageProps)

export { imageProps }

export const _ImageComponent = Image

export default Image
