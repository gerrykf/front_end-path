var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import GyButton from './Button.vue';
export default await (() => __awaiter(void 0, void 0, void 0, function* () {
    const __VLS_props = defineProps({
        show: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
        },
        width: {
            type: String,
            default: '50%',
        },
    });
    const emit = defineEmits();
    const slots = defineSlots();
    const handleShow = () => {
        emit('update:show', false);
    };
    debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    const __VLS_0 = {}.Transition;
    /** @type {[typeof __VLS_components.Transition, typeof __VLS_components.Transition, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        name: "dialog-fade",
        persisted: true,
    }));
    const __VLS_2 = __VLS_1({
        name: "dialog-fade",
        persisted: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_3.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "gy-dialog" }));
    __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, Object.assign(Object.assign({}, __VLS_directiveBindingRestFields), { value: (__VLS_ctx.show) }), null, null);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ onClick: (__VLS_ctx.handleShow) }, { class: "gy-dialog-mask" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "gy-dialog-content" }, { style: (__VLS_ctx.width ? { width: __VLS_ctx.width } : {}) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "gy-dialog-header" }));
    __VLS_asFunctionalSlot(slots.header)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ onClick: (__VLS_ctx.handleShow) }, { class: "gy-dialog-close" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "gy-dialog-body" }));
    __VLS_asFunctionalSlot(slots['default'])({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "gy-dialog-footer" }));
    __VLS_asFunctionalSlot(slots.footer)({});
    /** @type {[typeof GyButton, typeof GyButton, ]} */ ;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(GyButton, new GyButton(Object.assign({ 'onClick': {} }, { type: "primary" })));
    const __VLS_8 = __VLS_7(Object.assign({ 'onClick': {} }, { type: "primary" }), ...__VLS_functionalComponentArgsRest(__VLS_7));
    let __VLS_10;
    let __VLS_11;
    let __VLS_12;
    const __VLS_13 = {
        onClick: (__VLS_ctx.handleShow)
    };
    __VLS_9.slots.default;
    var __VLS_9;
    /** @type {[typeof GyButton, typeof GyButton, ]} */ ;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(GyButton, new GyButton(Object.assign({ 'onClick': {} }, { type: "default" })));
    const __VLS_15 = __VLS_14(Object.assign({ 'onClick': {} }, { type: "default" }), ...__VLS_functionalComponentArgsRest(__VLS_14));
    let __VLS_17;
    let __VLS_18;
    let __VLS_19;
    const __VLS_20 = {
        onClick: (__VLS_ctx.handleShow)
    };
    __VLS_16.slots.default;
    var __VLS_16;
    var __VLS_3;
    /** @type {__VLS_StyleScopedClasses['gy-dialog']} */ ;
    /** @type {__VLS_StyleScopedClasses['gy-dialog-mask']} */ ;
    /** @type {__VLS_StyleScopedClasses['gy-dialog-content']} */ ;
    /** @type {__VLS_StyleScopedClasses['gy-dialog-header']} */ ;
    /** @type {__VLS_StyleScopedClasses['gy-dialog-close']} */ ;
    /** @type {__VLS_StyleScopedClasses['gy-dialog-body']} */ ;
    /** @type {__VLS_StyleScopedClasses['gy-dialog-footer']} */ ;
    var __VLS_dollars;
    const __VLS_self = (yield import('vue')).defineComponent({
        setup() {
            return {
                GyButton: GyButton,
                handleShow: handleShow,
            };
        },
        __typeEmits: {},
        props: {
            show: {
                type: Boolean,
                default: false,
            },
            title: {
                type: String,
                default: '',
            },
            width: {
                type: String,
                default: '50%',
            },
        },
        name: 'GyDialog',
    });
    const __VLS_component = (yield import('vue')).defineComponent({
        setup() {
            return {};
        },
        __typeEmits: {},
        props: {
            show: {
                type: Boolean,
                default: false,
            },
            title: {
                type: String,
                default: '',
            },
            width: {
                type: String,
                default: '50%',
            },
        },
        name: 'GyDialog',
    });
    return {};
}))();
; /* PartiallyEnd: #4569/main.vue */
