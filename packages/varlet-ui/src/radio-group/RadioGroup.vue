<template>
  <div :class="n('wrap')">
    <div :aria-label="ariaLabel" role="radiogroup" :class="classes(n(), n(`--${direction}`))">
      <template v-if="options.length">
        <var-radio
          v-for="option in options"
          :key="option[valueKey]"
          :checked-value="option[valueKey]"
          :disabled="option.disabled"
        >
          <template #default="{ checked }">
            <maybe-v-node :is="isFunction(option[labelKey]) ? option[labelKey](option, checked) : option[labelKey]" />
          </template>
        </var-radio>
      </template>
      <slot />
    </div>

    <var-form-details :error-message="errorMessage" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, watch } from 'vue'
import { call, isFunction, preventDefault } from '@varlet/shared'
import { useEventListener } from '@varlet/use'
import VarFormDetails from '../form-details'
import { useForm } from '../form/provide'
import VarRadio from '../radio'
import { createNamespace, MaybeVNode, useValidation } from '../utils/components'
import { props, type RadioGroupValidateTrigger } from './props'
import { useRadios, type RadioGroupProvider } from './provide'

const { name, n, classes } = createNamespace('radio-group')

export default defineComponent({
  name,
  components: { VarFormDetails, VarRadio, MaybeVNode },
  props,
  setup(props) {
    const { length, radios, bindRadios } = useRadios()
    const { bindForm } = useForm()
    const {
      errorMessage,
      validateWithTrigger: vt,
      validate: v,
      // expose
      resetValidation,
    } = useValidation()
    const radioGroupErrorMessage = computed(() => errorMessage.value)
    const hasChecked = ref(false)

    const radioGroupProvider: RadioGroupProvider = {
      onToggle,
      validate,
      reset,
      resetValidation,
      hasChecked: computed(() => hasChecked.value),
      errorMessage: radioGroupErrorMessage,
    }

    watch(() => props.modelValue, syncRadios)
    watch(() => length.value, syncRadios)

    call(bindForm, radioGroupProvider)
    bindRadios(radioGroupProvider)

    useEventListener(() => window, 'keydown', handleKeydown)

    function handleKeydown(event: KeyboardEvent) {
      const focusingRadioIndex = radios.findIndex(({ isFocusing }) => isFocusing.value)
      if (focusingRadioIndex === -1) {
        return
      }

      const hasMoveableRadio = radios.some(({ moveable }, index) => (index === focusingRadioIndex ? false : moveable()))
      if (!hasMoveableRadio) {
        return
      }

      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        preventDefault(event)
      }

      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        moveRadio(focusingRadioIndex, 'prev')
        return
      }

      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        moveRadio(focusingRadioIndex, 'next')
      }
    }

    function moveRadio(fromIndex: number, method: 'prev' | 'next') {
      const looping = true

      while (looping) {
        if (method === 'prev') {
          fromIndex--
        } else {
          fromIndex++
        }

        if (fromIndex < 0) {
          fromIndex = radios.length - 1
        }

        if (fromIndex > radios.length - 1) {
          fromIndex = 0
        }

        const radio = radios[fromIndex]
        if (radio.moveable()) {
          radio.move()
          break
        }
      }
    }

    function validateWithTrigger(trigger: RadioGroupValidateTrigger) {
      nextTick(() => {
        const { validateTrigger, rules, modelValue } = props
        vt(validateTrigger, trigger, rules, modelValue)
      })
    }

    function syncRadios() {
      radios.forEach(({ sync }) => {
        if (sync(props.modelValue)) {
          hasChecked.value = true
        }
      })
    }

    function onToggle(changedValue: any) {
      call(props['onUpdate:modelValue'], changedValue)
      call(props.onChange, changedValue)
      validateWithTrigger('onChange')
    }

    // expose
    function validate() {
      return v(props.rules, props.modelValue)
    }

    // expose
    function reset() {
      call(props['onUpdate:modelValue'], undefined)
      resetValidation()
    }

    return {
      errorMessage,
      n,
      classes,
      reset,
      validate,
      resetValidation,
      isFunction,
    }
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import '../form-details/formDetails';
@import '../ripple/ripple';
@import '../hover-overlay/hoverOverlay';
@import '../icon/icon';
@import '../radio/radio';
@import './radioGroup';
</style>
