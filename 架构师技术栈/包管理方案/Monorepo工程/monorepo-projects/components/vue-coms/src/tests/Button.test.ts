import { mount } from '@vue/test-utils'
import Button from '@/components/Button.vue'

describe('Button.vue', () => {
    test('渲染默认类型按钮', () => {
        const wrapper = mount(Button)
        expect(wrapper.classes()).toContain('gy-button')
        expect(wrapper.classes()).toContain('gy-button-default')
      })

  test('按钮渲染类型', () => {
    const wrapper = mount(Button, { props: { type: 'primary' } })
    expect(wrapper.classes()).toContain('gy-button')
    expect(wrapper.classes()).toContain('gy-button-primary')
  })

  test('渲染朴素按钮', () => {
    const wrapper = mount(Button, { props: { plain: true } })
    expect(wrapper.classes()).toContain('is-plain')
  })

  test('渲染圆角按钮', () => {
    const wrapper = mount(Button, { props: { round: true } })
    expect(wrapper.classes()).toContain('is-round')
  })

  test('渲染圆形按钮', () => {
    const wrapper = mount(Button, { props: { circle: true } })
    expect(wrapper.classes()).toContain('is-circle')
  })

  test('渲染不可用状态按钮', () => {
    const wrapper = mount(Button, { props: { disabled: true } })
    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.attributes()).toHaveProperty('disabled')
  })

  test('渲染带图标按钮', () => {
    const wrapper = mount(Button, { props: { icon: 'home' } })
    expect(wrapper.find('i').classes()).toContain('gy-icon-home')
  })

  test('插槽内容按钮', () => {
    const wrapper = mount(Button, { slots: { default: 'Click Me' } })
    expect(wrapper.text()).toContain('Click Me')
  })

  test('测试点击事件', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
