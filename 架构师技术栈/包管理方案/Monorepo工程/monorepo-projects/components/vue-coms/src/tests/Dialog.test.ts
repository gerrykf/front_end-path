import { mount } from '@vue/test-utils'
import Dialog from '@/components/Dialog.vue'

describe('测试Dialog组件', () => {
  it('测试标题和slots', () => {
    const titleSlotContent = '自定义标题'
    const footerSlotContent = '自定义底部'
    const wrapper = mount(Dialog, {
      props: { visible: true, title: titleSlotContent },
      slots: {
        footer: footerSlotContent,
      },
    })

    expect(wrapper.find('.gy-dialog_title').text()).toBe(titleSlotContent)
    expect(wrapper.find('.gy-dialog_footer').text()).toBe(footerSlotContent)
  })

  it('测试宽度', () => {
    const width = '60%'
    const wrapper = mount(Dialog, {
      props: {
        width,
      },
    })
    expect(wrapper.find('.gy-dialog').attributes('style')).toContain(`width: ${width}`)
  })

  it('测试顶部边距', () => {
    const top = '20vh'
    const wrapper = mount(Dialog, {
      props: {
        top,
      },
    })
    expect(wrapper.find('.gy-dialog').attributes('style')).toContain(`margin-top: ${top}`)
  })

  it('触发close事件', async () => {
    const wrapper = mount(Dialog, {
      props: { visible: true },
    })

    const closeButton = wrapper.find('.gy-dialog_headerbtn')
    await closeButton.trigger('click')

    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
