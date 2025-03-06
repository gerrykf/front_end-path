var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default await (() => __awaiter(void 0, void 0, void 0, function* () {
    const props = defineProps({
        type: {
            type: String,
            required: true,
        },
        plain: {
            type: Boolean,
            default: false,
        },
        round: {
            type: Boolean,
            default: false,
        },
        cicle: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        icon: {
            type: String,
            default: '',
        },
    });
    const emit = defineEmits(['click']);
    const slots = defineSlots();
    const handleClick = (e) => {
        emit('click', e);
    };
    debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    /** @type {__VLS_StyleScopedClasses['gy-button-primary']} */ ;
    /** @type {__VLS_StyleScopedClasses['gy-button-success']} */ ;
    /** @type {__VLS_StyleScopedClasses['gy-button-warning']} */ ;
    /** @type {__VLS_StyleScopedClasses['gy-button-danger']} */ ;
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(Object.assign(Object.assign(Object.assign({ onClick: (__VLS_ctx.handleClick) }, { class: "gy-button" }), { class: ([
            `gy-button-${props.type ? props.type.toString() : 'default'}`,
            {
                'is-plain': props.plain,
                'is-round': props.round,
                'is-circle': props.cicle,
                'is-disabled': props.disabled,
            },
        ]) }), { disabled: (props.disabled) }));
    if (props.icon) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(Object.assign({ class: (`gy-icon-${props.icon}`) }));
    }
    if (slots.default) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_asFunctionalSlot(slots['default'])({});
    }
    /** @type {__VLS_StyleScopedClasses['gy-button']} */ ;
    /** @type {__VLS_StyleScopedClasses['is-plain']} */ ;
    /** @type {__VLS_StyleScopedClasses['is-round']} */ ;
    /** @type {__VLS_StyleScopedClasses['is-circle']} */ ;
    /** @type {__VLS_StyleScopedClasses['is-disabled']} */ ;
    var __VLS_dollars;
    const __VLS_self = (yield import('vue')).defineComponent({
        setup() {
            return {
                handleClick: handleClick,
            };
        },
        emits: {},
        props: {
            type: {
                type: String,
                required: true,
            },
            plain: {
                type: Boolean,
                default: false,
            },
            round: {
                type: Boolean,
                default: false,
            },
            cicle: {
                type: Boolean,
                default: false,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            icon: {
                type: String,
                default: '',
            },
        },
        name: 'GyButton',
    });
    const __VLS_component = (yield import('vue')).defineComponent({
        setup() {
            return {};
        },
        emits: {},
        props: {
            type: {
                type: String,
                required: true,
            },
            plain: {
                type: Boolean,
                default: false,
            },
            round: {
                type: Boolean,
                default: false,
            },
            cicle: {
                type: Boolean,
                default: false,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            icon: {
                type: String,
                default: '',
            },
        },
        name: 'GyButton',
    });
    return {};
}))();
; /* PartiallyEnd: #4569/main.vue */
