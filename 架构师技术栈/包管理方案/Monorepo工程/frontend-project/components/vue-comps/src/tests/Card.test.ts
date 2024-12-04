import { mount } from '@vue/test-utils';
import Card from '@/components/Card.vue';

describe('测试Card组件', () => {
  test('渲染默认卡片', () => {
    const wrapper = mount(Card);
    expect(wrapper.classes()).toContain('gy-card');
  });

  test('渲染自定义内容', () => {
    const wrapper = mount(Card, {
      slots: {
        default: '内容',
      },
    });
    expect(wrapper.find('.gy-card-summary').text()).toBe('内容');
  });

  test('渲染自定义底部', () => {
    const wrapper = mount(Card, {
      slots: {
        footer: '底部',
      },
    });
    expect(wrapper.find('.gy-card-footer').text()).toBe('底部');
  });
});
