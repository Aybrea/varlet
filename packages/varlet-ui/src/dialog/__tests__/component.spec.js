import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Dialog from '..'
import VarButton from '../../button'
import VarIcon from '../../icon'
import { delay, triggerKeyboard } from '../../utils/test'
import VarDialog from '../Dialog'

test('dialog component plugin', () => {
  const app = createApp({}).use(Dialog.Component)
  expect(app.component(Dialog.Component.name)).toBeTruthy()
})

const Wrapper = {
  components: {
    [VarDialog.name]: VarDialog,
  },
  props: ['closeOnClickOverlay', 'onBeforeClose', 'onClickOverlay'],
  data: () => ({
    show: false,
  }),
  template: `
    <var-dialog v-model:show="show" v-bind="$props" :teleport="null" />
  `,
}

describe('test dialog component props', () => {
  test('dialog component confirmButton', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        show: true,
      },
    })

    expect(wrapper.find('.var-dialog__confirm-button').exists()).toBe(true)

    await wrapper.setProps({
      confirmButton: false,
    })
    expect(wrapper.find('.var-dialog__confirm-button').exists()).toBe(false)

    wrapper.unmount()
  })

  test('dialog component cancelButton', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        show: true,
      },
    })

    expect(wrapper.find('.var-dialog__cancel-button').exists()).toBe(true)

    await wrapper.setProps({
      cancelButton: false,
    })
    expect(wrapper.find('.var-dialog__cancel-button').exists()).toBe(false)

    wrapper.unmount()
  })

  test('dialog component confirmButtonText', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        show: true,
      },
    })

    expect(wrapper.find('.var-dialog__confirm-button').text()).toBe('确认')

    await wrapper.setProps({
      confirmButtonText: 'confirm',
    })
    expect(wrapper.find('.var-dialog__confirm-button').text()).toBe('confirm')

    wrapper.unmount()
  })

  test('dialog component cancelButtonText', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        show: true,
      },
    })

    expect(wrapper.find('.var-dialog__cancel-button').text()).toBe('取消')

    await wrapper.setProps({
      cancelButtonText: 'cancel',
    })
    expect(wrapper.find('.var-dialog__cancel-button').text()).toBe('cancel')

    wrapper.unmount()
  })

  test('dialog component title', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        show: true,
      },
    })

    expect(wrapper.find('.var-dialog__title').text()).toBe('提示')

    await wrapper.setProps({
      title: 'Dialog Title',
    })
    expect(wrapper.find('.var-dialog__title').text()).toBe('Dialog Title')

    wrapper.unmount()
  })

  test('dialog component message', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        show: true,
        message: 'Dialog',
      },
    })

    expect(wrapper.find('.var-dialog__message').text()).toBe('Dialog')

    await wrapper.setProps({
      message: 'Dialog Message',
    })
    expect(wrapper.find('.var-dialog__message').text()).toBe('Dialog Message')

    wrapper.unmount()
  })

  test('dialog component dialogClass', () => {
    const wrapper = mount(Wrapper, {
      props: {
        show: true,
        dialogClass: 'test-dialog-class',
      },
    })

    expect(wrapper.find('.test-dialog-class').exists()).toBe(true)

    wrapper.unmount()
  })

  test('dialog component dialogStyle', () => {
    const wrapper = mount(Wrapper, {
      props: {
        show: true,
        dialogStyle: {
          background: 'red',
        },
      },
    })

    expect(wrapper.find('.var-dialog').attributes('style')).toContain('background: red')

    wrapper.unmount()
  })

  test('dialog component width', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        show: true,
        width: 100,
      },
    })

    expect(wrapper.find('.var-dialog').attributes('style')).toContain('width: 100px')

    await wrapper.setProps({
      width: '200',
    })
    expect(wrapper.find('.var-dialog').attributes('style')).toContain('width: 200px')

    wrapper.unmount()
  })

  test('dialog component messageAlign', () => {
    ;['left', 'center', 'right'].forEach((align) => {
      const wrapper = mount(Wrapper, {
        props: {
          show: true,
          messageAlign: align,
        },
      })

      expect(wrapper.find('.var-dialog__message').attributes('style')).toContain(`text-align: ${align}`)

      wrapper.unmount()
    })
  })

  test('dialog component confirmButtonColor', () => {
    const wrapper = mount(Wrapper, {
      props: {
        show: true,
        confirmButtonColor: 'blue',
      },
    })

    expect(wrapper.find('.var-dialog__confirm-button[var-dialog-cover]').attributes('style')).toContain(
      'background: blue',
    )

    wrapper.unmount()
  })

  test('dialog component cancelButtonColor', () => {
    const wrapper = mount(Wrapper, {
      props: {
        show: true,
        cancelButtonColor: 'blue',
      },
    })

    expect(wrapper.find('.var-dialog__cancel-button[var-dialog-cover]').attributes('style')).toContain(
      'background: blue',
    )

    wrapper.unmount()
  })

  test('dialog component confirmButtonTextColor', () => {
    const wrapper = mount(Wrapper, {
      props: {
        show: true,
        confirmButtonTextColor: 'blue',
      },
    })

    expect(wrapper.find('.var-dialog__confirm-button[var-dialog-cover]').attributes('style')).toContain('color: blue')

    wrapper.unmount()
  })

  test('dialog component cancelButtonTextColor', () => {
    const wrapper = mount(Wrapper, {
      props: {
        show: true,
        cancelButtonTextColor: 'blue',
      },
    })

    expect(wrapper.find('.var-dialog__cancel-button[var-dialog-cover]').attributes('style')).toContain('color: blue')

    wrapper.unmount()
  })
})

describe('test dialog component events', () => {
  test('dialog component click overlay', async () => {
    const onClickOverlay = vi.fn()

    const wrapper = mount(Wrapper, {
      props: {
        onClickOverlay,
        closeOnClickOverlay: false,
      },
    })
    await wrapper.setData({ show: true })

    await wrapper.find('.var-popup__overlay').trigger('click')
    expect(onClickOverlay).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.show).toBe(true)

    await wrapper.setProps({ closeOnClickOverlay: true })
    await wrapper.find('.var-popup__overlay').trigger('click')
    expect(onClickOverlay).toHaveBeenCalledTimes(2)
    expect(wrapper.vm.show).toBe(false)

    wrapper.unmount()
  })

  test('dialog component onBeforeClose', async () => {
    const wrapper = mount({
      components: {
        [VarDialog.name]: VarDialog,
      },
      data: () => ({
        show: true,
      }),
      methods: {
        async onBeforeClose(_action, change) {
          await delay(500)
          change()
        },
      },
      template: `<var-dialog v-model:show="show" :teleport="null" @before-close="onBeforeClose" />`,
    })

    await wrapper.find('.var-popup__overlay').trigger('click')
    expect(wrapper.vm.show).toBe(true)

    await delay(600)
    expect(wrapper.vm.show).toBe(false)

    await wrapper.setData({
      show: true,
    })

    await wrapper.find('.var-dialog__cancel-button').trigger('click')
    expect(wrapper.vm.show).toBe(true)

    await delay(600)
    expect(wrapper.vm.show).toBe(false)

    await wrapper.setData({
      show: true,
    })

    await wrapper.find('.var-dialog__confirm-button').trigger('click')
    expect(wrapper.vm.show).toBe(true)

    await delay(600)
    expect(wrapper.vm.show).toBe(false)

    wrapper.unmount()
  })

  test('dialog keyboard escape', async () => {
    const onKeyEscape = vi.fn()
    const wrapper = mount({
      components: {
        [VarDialog.name]: VarDialog,
      },
      data: () => ({
        show: true,
      }),
      methods: {
        onKeyEscape,
      },
      template: `<var-dialog v-model:show="show" :teleport="null" @key-escape="onKeyEscape" />`,
    })

    await triggerKeyboard(window, 'keydown', { key: 'Escape' })
    expect(onKeyEscape).toBeCalledTimes(1)
    expect(wrapper.vm.show).toBe(false)

    wrapper.unmount()
  })

  test('dialog keyboard escape and closeOnKeyEscape', async () => {
    const onKeyEscape = vi.fn()
    const wrapper = mount({
      components: {
        [VarDialog.name]: VarDialog,
      },
      data: () => ({
        show: true,
      }),
      methods: {
        onKeyEscape,
      },
      template: `<var-dialog v-model:show="show" :close-on-key-escape="false" :teleport="null" @key-escape="onKeyEscape" />`,
    })

    await triggerKeyboard(window, 'keydown', { key: 'Escape' })
    expect(onKeyEscape).toBeCalledTimes(1)
    expect(wrapper.vm.show).toBe(true)

    wrapper.unmount()
  })
})

describe('test dialog component slots', () => {
  test('dialog title slot', async () => {
    const wrapper = mount({
      components: {
        [VarDialog.name]: VarDialog,
        [VarIcon.name]: VarIcon,
      },
      data: () => ({
        show: true,
      }),
      template: `
        <var-dialog v-model:show="show" :teleport="null">
          <template #title>
            <var-icon name="information" />
          </template>
        </var-dialog>
      `,
    })

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.find('.var-icon').exists()

    wrapper.unmount()
  })

  test('dialog default slot', () => {
    const wrapper = mount({
      components: {
        [VarDialog.name]: VarDialog,
      },
      data: () => ({
        show: true,
      }),
      template: `
        <var-dialog v-model:show="show" :teleport="null">
          dialog default slot
        </var-dialog>
      `,
    })

    expect(wrapper.find('.var-dialog__message').text()).toBe('dialog default slot')

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.unmount()
  })

  test('dialog actions slot', async () => {
    const wrapper = mount({
      components: {
        [VarDialog.name]: VarDialog,
        [VarButton.name]: VarButton,
      },
      data: () => ({
        show: true,
      }),
      template: `<var-dialog v-model:show="show" :teleport="null">
        <template #actions="{slotClass, cancel, confirm}">
          <div :class="slotClass">
            <var-button class="cancel" @click="cancel">cancel</var-button>
            <var-button class="confirm" @click="confirm">confirm</var-button>
          </div>
        </template>
      </var-dialog>`,
    })

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.find('.cancel').trigger('click')
    await delay(300)
    expect(wrapper.vm.show).toBe(false)

    await wrapper.setData({
      show: true,
    })

    await wrapper.find('.confirm').trigger('click')
    await delay(300)
    expect(wrapper.vm.show).toBe(false)

    wrapper.unmount()
  })
})
