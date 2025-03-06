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
    const __VLS_props = defineProps({
        width: {
            type: Number,
            default: 0,
        },
        imgSrc: {
            type: String,
            default: '',
            required: true,
        },
        imgHeight: {
            type: Number,
            default: 0,
        },
        summary: {
            type: String,
            default: '',
        },
    });
    debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "gy-card" }, { style: (__VLS_ctx.width ? { width: __VLS_ctx.width + 'px' } : {}) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "gy-card-img" }, { style: (__VLS_ctx.imgHeight ? { height: __VLS_ctx.imgHeight } : {}) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (__VLS_ctx.imgSrc),
        alt: "图片",
    });
    if (__VLS_ctx.summary) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "gy-card-summary" }));
        (__VLS_ctx.summary);
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "gy-card-summary" }));
        var __VLS_0 = {};
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "gy-card-footer" }));
    var __VLS_2 = {};
    /** @type {__VLS_StyleScopedClasses['gy-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['gy-card-img']} */ ;
    /** @type {__VLS_StyleScopedClasses['gy-card-summary']} */ ;
    /** @type {__VLS_StyleScopedClasses['gy-card-summary']} */ ;
    /** @type {__VLS_StyleScopedClasses['gy-card-footer']} */ ;
    // @ts-ignore
    var __VLS_1 = __VLS_0, __VLS_3 = __VLS_2;
    var __VLS_dollars;
    const __VLS_self = (yield import('vue')).defineComponent({
        setup() {
            return {};
        },
        props: {
            width: {
                type: Number,
                default: 0,
            },
            imgSrc: {
                type: String,
                default: '',
                required: true,
            },
            imgHeight: {
                type: Number,
                default: 0,
            },
            summary: {
                type: String,
                default: '',
            },
        },
        name: 'GyCard',
    });
    const __VLS_component = (yield import('vue')).defineComponent({
        setup() {
            return {};
        },
        props: {
            width: {
                type: Number,
                default: 0,
            },
            imgSrc: {
                type: String,
                default: '',
                required: true,
            },
            imgHeight: {
                type: Number,
                default: 0,
            },
            summary: {
                type: String,
                default: '',
            },
        },
        name: 'GyCard',
    });
    return {};
}))();
; /* PartiallyEnd: #4569/main.vue */
