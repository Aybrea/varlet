<template>
  <div ref="host" :class="classes(n(), n('$--box'))">
    <slot />

    <Teleport :to="teleport === false ? undefined : teleport" :disabled="teleportDisabled || teleport === false">
      <transition :name="n()" @after-enter="onOpened" @after-leave="handleClosed">
        <div
          v-show="show"
          ref="popover"
          :style="{
            zIndex,
            width: sameWidth ? toSizeUnit(Math.ceil(referenceSize.width)) : undefined,
          }"
          :class="
            classes(
              n('menu'),
              n('$--box'),
              popoverClass,
              [defaultStyle, n('--menu-background-color')],
              [defaultStyle, formatElevation(elevation, 3)],
            )
          "
          @click.stop
          @mouseenter="handlePopoverMouseenter"
          @mouseleave="handlePopoverMouseleave"
        >
          <slot name="menu" />
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespace, formatElevation, useTeleport } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { props } from './props'
import { usePopover } from './usePopover'

const { name, n, classes } = createNamespace('menu')

export default defineComponent({
  name,
  props,
  setup(props) {
    const { disabled: teleportDisabled } = useTeleport()
    const {
      popover,
      host,
      referenceSize,
      show,
      zIndex,
      handlePopoverMouseenter,
      handlePopoverMouseleave,
      handlePopoverClose,
      handleClosed,
      setAllowClose,
      // expose
      open,
      // expose
      close,
      // expose
      resize,
      // expose
      setReference,
    } = usePopover(props)

    function allowClose() {
      setAllowClose(true)
    }

    return {
      popover,
      host,
      referenceSize,
      show,
      zIndex,
      teleportDisabled,
      allowClose,
      formatElevation,
      toSizeUnit,
      n,
      classes,
      handlePopoverMouseenter,
      handlePopoverMouseleave,
      handlePopoverClose,
      handleClosed,
      resize,
      open,
      close,
      setReference,
    }
  },
})
</script>

<style lang="less">
@import '../styles/elevation';
@import '../styles/common';
@import './menu';
</style>
