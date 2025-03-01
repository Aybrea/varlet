<template>
  <div
    ref="root"
    v-ripple="{ disabled: disabled || !ripple }"
    v-hover:desktop="handleHovering"
    :class="
      classes(
        n(),
        n('$--box'),
        n(`--${size}`),
        [optionSelected, n('--selected-color')],
        [disabled, n('--disabled')],
        [childrenTrigger, n('--children-trigger')],
      )
    "
    :tabindex="disabled ? undefined : '-1'"
    @click="handleClick"
    @focus="isFocusing = true"
    @blur="isFocusing = false"
  >
    <div :class="classes(n('cover'), [optionSelected, n('--selected-background')])"></div>

    <var-checkbox
      v-if="multiple"
      ref="checkbox"
      v-model="optionSelected"
      v-model:indeterminate="optionIndeterminate"
      :disabled="disabled"
      @click.stop
      @change="handleSelect"
    />

    <slot>
      <div :class="classes(n('text'))">
        <maybe-v-node :is="labelVNode" :class="n('$--ellipsis')" />
      </div>
    </slot>

    <div v-if="childrenTrigger" :class="n('arrow')">
      <var-icon var-menu-option-cover :class="n('arrow-icon')" name="chevron-right" />
    </div>

    <var-hover-overlay :hovering="(hovering || highlight) && !disabled" :focusing="isFocusing && !disabled" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, watch } from 'vue'
import { call, isBoolean, isFunction, preventDefault } from '@varlet/shared'
import { useEventListener } from '@varlet/use'
import VarCheckbox from '../checkbox'
import Hover from '../hover'
import VarHoverOverlay, { useHoverOverlay } from '../hover-overlay'
import VarIcon from '../icon'
import Ripple from '../ripple'
import { createNamespace, MaybeVNode } from '../utils/components'
import { props } from './props'
import { useMenuSelect, type MenuOptionProvider } from './provide'

const { name, n, classes } = createNamespace('menu-option')

export default defineComponent({
  name,
  directives: { Ripple, Hover },
  components: {
    VarCheckbox,
    VarHoverOverlay,
    VarIcon,
    MaybeVNode,
  },
  props,
  setup(props) {
    const root = ref<HTMLElement>()
    const checkbox = ref<InstanceType<typeof VarCheckbox>>()
    const isFocusing = ref(false)
    const optionSelected = ref(false)
    const optionIndeterminate = ref(false)
    const selected = computed(() => optionSelected.value)
    const indeterminate = computed(() => optionIndeterminate.value)
    const value = computed<any>(() => props.value)
    const disabled = computed(() => props.disabled)
    const ripple = computed(() => props.ripple)
    const { menuSelect, bindMenuSelect } = useMenuSelect()
    const { size, multiple, onSelect, computeLabel } = menuSelect
    const { hovering, handleHovering } = useHoverOverlay()

    const labelVNode = computed(() =>
      isFunction(props.label)
        ? props.label(
            props.option ?? {
              label: props.label,
              value: props.value,
              disabled: props.disabled,
              ripple: props.ripple,
            },
            optionSelected.value,
          )
        : props.label,
    )

    const menuOptionProvider: MenuOptionProvider = {
      label: labelVNode,
      value,
      selected,
      disabled,
      ripple,
      indeterminate,
      sync,
    }

    watch([() => props.label, () => props.value], computeLabel)

    bindMenuSelect(menuOptionProvider)

    useEventListener(() => window, 'keydown', handleKeydown)
    useEventListener(() => window, 'keyup', handleKeyup)

    function handleClick() {
      if (props.disabled) {
        return
      }

      if (!multiple.value && props.childrenTrigger) {
        return
      }

      if (multiple.value && optionIndeterminate.value) {
        optionIndeterminate.value = false
        optionSelected.value = false
        onSelect(menuOptionProvider)
        return
      }

      if (multiple.value && !optionIndeterminate.value) {
        optionSelected.value = !optionSelected.value
      }

      onSelect(menuOptionProvider)
    }

    function handleKeydown(event: KeyboardEvent) {
      if (!isFocusing.value && !checkbox.value?.isFocusing) {
        return
      }

      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        preventDefault(event)
        call(props.onKeyArrowX, event.key)
      }

      if (!isFocusing.value) {
        return
      }

      if (event.key === ' ' || event.key === 'Enter') {
        preventDefault(event)
      }

      if (event.key === 'Enter') {
        root.value!.click()
      }
    }

    function handleKeyup(event: KeyboardEvent) {
      if (!isFocusing.value) {
        return
      }

      if (event.key === ' ') {
        preventDefault(event)
        root.value!.click()
      }
    }

    async function handleSelect() {
      await nextTick()
      onSelect(menuOptionProvider)
    }

    function sync(checked: boolean, indeterminate?: boolean) {
      optionSelected.value = checked

      if (isBoolean(indeterminate)) {
        optionIndeterminate.value = indeterminate
      }
    }

    return {
      root,
      checkbox,
      optionSelected,
      optionIndeterminate,
      size,
      multiple,
      hovering,
      isFocusing,
      labelVNode,
      n,
      classes,
      handleHovering,
      handleClick,
      handleSelect,
    }
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import '../icon/icon';
@import '../ripple/ripple';
@import '../checkbox/checkbox';
@import './menuOption';
</style>
