import { mount } from '@vue/test-utils'
import Card from '@/components/Card.vue'

// 测试套件
describe('Card.vue', () => {
  it('测试卡片宽度', () => {
    const wrapper = mount(Card, {
      props: {
        width: 300,
        imgSrc: 'https://example.com/example-image.jpg',
      },
    })
    expect(wrapper.attributes('style')).toContain('width: 300px;')
  })

  it('测试卡片图片资源', () => {
    const imgSrc = 'https://example.com/example-image.jpg'
    const wrapper = mount(Card, {
      props: {
        imgSrc,
      },
    })
    expect(wrapper.find('.gy-card-img img').attributes('src')).toBe(imgSrc)
  })

  it('测试卡片图片高度', () => {
    const wrapper = mount(Card, {
      props: {
        imgHeight: 200,
        imgSrc: 'https://example.com/example-image.jpg',
      },
    })
    expect(wrapper.find('.gy-card-img').attributes('style')).toContain('height: 200px;')
  })

  it('测试卡片概要', () => {
    const summary = 'This is a summary.'
    const wrapper = mount(Card, {
      props: {
        summary,
        imgSrc: 'https://example.com/example-image.jpg',
      },
    })
    expect(wrapper.find('.gy-card-summary').text()).toBe(summary)
  })

  it('测试插槽', () => {
    const defaultSlotContent = 'This is default slot content.'
    const wrapper = mount(Card, {
      props: {
        imgSrc: 'https://example.com/example-image.jpg',
      },
      slots: {
        default: defaultSlotContent,
      },
    })
    expect(wrapper.find('.gy-card-summary').text()).toBe(defaultSlotContent)
  })

  it('测试footer插槽', () => {
    const footerSlotContent = 'This is footer slot content.'
    const wrapper = mount(Card, {
      props: {
        imgSrc: 'https://example.com/example-image.jpg',
      },
      slots: {
        footer: footerSlotContent,
      },
    })
    expect(wrapper.find('.gy-card-footer').text()).toBe(footerSlotContent)
  })
})
