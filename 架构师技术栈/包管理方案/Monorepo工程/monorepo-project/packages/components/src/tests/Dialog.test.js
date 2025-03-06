var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { mount } from '@vue/test-utils';
import Dialog from '@/components/Dialog.vue';
describe('测试Dialog组件', () => {
    test('渲染默认对话框', () => {
        const wrapper = mount(Dialog, {
            props: {
                show: true,
            },
        });
        expect(wrapper.find('.gy-dialog').exists()).toBe(true);
    });
    test('渲染弹窗蒙层', () => {
        const wrapper = mount(Dialog);
        expect(wrapper.find('.gy-dialog-mask').exists()).toBe(true);
    });
    test('渲染自定义头部', () => {
        const wrapper = mount(Dialog, {
            props: {
                show: true,
            },
            slots: {
                header: '提示',
            },
        });
        expect(wrapper.find('.gy-dialog-header').exists()).toBe(true);
    });
    test('渲染自定义内容', () => {
        const wrapper = mount(Dialog, {
            slots: {
                default: '内容',
            },
        });
        expect(wrapper.find('.gy-dialog-body').text()).toBe('内容');
    });
    test('渲染自定义底部', () => {
        const wrapper = mount(Dialog, {
            slots: {
                footer: '底部',
            },
        });
        expect(wrapper.find('.gy-dialog-footer').exists()).toBe(true);
    });
    test('触发关闭事件', () => __awaiter(void 0, void 0, void 0, function* () {
        const wrapper = mount(Dialog, {
            props: {
                show: true,
            },
        });
        yield wrapper.find('.gy-dialog-close').trigger('click');
        expect(wrapper.emitted('update:show')).toBeTruthy();
    }));
});
