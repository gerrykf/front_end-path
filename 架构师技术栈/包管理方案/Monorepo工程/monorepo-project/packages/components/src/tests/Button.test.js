import { mount } from '@vue/test-utils';
import Button from '@/components/Button.vue';
describe('测试Button组件', () => {
    test('渲染默认类型按钮', () => {
        const wrapper = mount(Button);
        expect(wrapper.classes()).toContain('gy-button');
        expect(wrapper.classes()).toContain('gy-button-default');
    });
    test('渲染主要类型按钮', () => {
        const wrapper = mount(Button, {
            props: {
                type: 'primary',
            },
        });
        expect(wrapper.classes()).toContain('gy-button');
        expect(wrapper.classes()).toContain('gy-button-primary');
    });
    test('渲染警告类型按钮', () => {
        const wrapper = mount(Button, {
            props: {
                type: 'warning',
            },
        });
        expect(wrapper.classes()).toContain('gy-button');
        expect(wrapper.classes()).toContain('gy-button-warning');
    });
    test('渲染危险类型按钮', () => {
        const wrapper = mount(Button, {
            props: {
                type: 'danger',
            },
        });
        expect(wrapper.classes()).toContain('gy-button');
        expect(wrapper.classes()).toContain('gy-button-danger');
    });
    test('渲染禁用按钮', () => {
        const wrapper = mount(Button, {
            props: {
                type: 'primary',
                disabled: true,
            },
        });
        expect(wrapper.classes()).toContain('gy-button');
        expect(wrapper.classes()).toContain('is-disabled');
    });
    test('渲染按钮文字', () => {
        const wrapper = mount(Button, {
            slots: {
                default: '按钮',
            },
        });
        expect(wrapper.text()).toBe('按钮');
    });
});
