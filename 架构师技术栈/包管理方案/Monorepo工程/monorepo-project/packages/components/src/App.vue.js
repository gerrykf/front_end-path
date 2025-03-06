import { ref } from 'vue';
import GyButton from './components/Button.vue';
import GyCard from './components/Card.vue';
import GyDialog from './components/Dialog.vue';
const handleClick = (e) => {
    console.log('click', e);
    alert('click');
};
const showDialog = ref(false);
const handleShow = () => {
    showDialog.value = true;
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "button-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
/** @type {[typeof GyButton, typeof GyButton, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(GyButton, new GyButton(Object.assign({ 'onClick': {} }, { type: "primary" })));
const __VLS_1 = __VLS_0(Object.assign({ 'onClick': {} }, { type: "primary" }), ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
let __VLS_5;
const __VLS_6 = {
    onClick: (__VLS_ctx.handleClick)
};
__VLS_2.slots.default;
var __VLS_2;
/** @type {[typeof GyButton, typeof GyButton, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(GyButton, new GyButton({
    type: "success",
}));
const __VLS_8 = __VLS_7({
    type: "success",
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
__VLS_9.slots.default;
var __VLS_9;
/** @type {[typeof GyButton, typeof GyButton, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(GyButton, new GyButton({
    type: "info",
}));
const __VLS_11 = __VLS_10({
    type: "info",
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
__VLS_12.slots.default;
var __VLS_12;
/** @type {[typeof GyButton, typeof GyButton, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(GyButton, new GyButton({
    type: "warning",
}));
const __VLS_14 = __VLS_13({
    type: "warning",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_15.slots.default;
var __VLS_15;
/** @type {[typeof GyButton, typeof GyButton, ]} */ ;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(GyButton, new GyButton({
    type: "danger",
}));
const __VLS_17 = __VLS_16({
    type: "danger",
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
__VLS_18.slots.default;
var __VLS_18;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
/** @type {[typeof GyButton, typeof GyButton, ]} */ ;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(GyButton, new GyButton({
    type: "primary",
    plain: true,
}));
const __VLS_20 = __VLS_19({
    type: "primary",
    plain: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
__VLS_21.slots.default;
var __VLS_21;
/** @type {[typeof GyButton, typeof GyButton, ]} */ ;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(GyButton, new GyButton({
    type: "success",
    plain: true,
}));
const __VLS_23 = __VLS_22({
    type: "success",
    plain: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
__VLS_24.slots.default;
var __VLS_24;
/** @type {[typeof GyButton, typeof GyButton, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(GyButton, new GyButton({
    type: "info",
    plain: true,
}));
const __VLS_26 = __VLS_25({
    type: "info",
    plain: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
var __VLS_27;
/** @type {[typeof GyButton, typeof GyButton, ]} */ ;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent(GyButton, new GyButton({
    type: "warning",
    plain: true,
}));
const __VLS_29 = __VLS_28({
    type: "warning",
    plain: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_28));
__VLS_30.slots.default;
var __VLS_30;
/** @type {[typeof GyButton, typeof GyButton, ]} */ ;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(GyButton, new GyButton({
    type: "danger",
    plain: true,
}));
const __VLS_32 = __VLS_31({
    type: "danger",
    plain: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
__VLS_33.slots.default;
var __VLS_33;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
/** @type {[typeof GyButton, typeof GyButton, ]} */ ;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent(GyButton, new GyButton({
    type: "primary",
    round: true,
}));
const __VLS_35 = __VLS_34({
    type: "primary",
    round: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
__VLS_36.slots.default;
var __VLS_36;
/** @type {[typeof GyButton, typeof GyButton, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(GyButton, new GyButton({
    type: "success",
    round: true,
}));
const __VLS_38 = __VLS_37({
    type: "success",
    round: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
__VLS_39.slots.default;
var __VLS_39;
/** @type {[typeof GyButton, typeof GyButton, ]} */ ;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent(GyButton, new GyButton({
    type: "info",
    round: true,
}));
const __VLS_41 = __VLS_40({
    type: "info",
    round: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
__VLS_42.slots.default;
var __VLS_42;
/** @type {[typeof GyButton, typeof GyButton, ]} */ ;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent(GyButton, new GyButton({
    type: "warning",
    round: true,
}));
const __VLS_44 = __VLS_43({
    type: "warning",
    round: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
__VLS_45.slots.default;
var __VLS_45;
/** @type {[typeof GyButton, typeof GyButton, ]} */ ;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent(GyButton, new GyButton({
    type: "danger",
    round: true,
}));
const __VLS_47 = __VLS_46({
    type: "danger",
    round: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
__VLS_48.slots.default;
var __VLS_48;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
/** @type {[typeof GyButton, typeof GyButton, ]} */ ;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(GyButton, new GyButton({
    type: "primary",
    cicle: true,
}));
const __VLS_50 = __VLS_49({
    type: "primary",
    cicle: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
__VLS_51.slots.default;
var __VLS_51;
/** @type {[typeof GyButton, typeof GyButton, ]} */ ;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent(GyButton, new GyButton({
    type: "success",
    cicle: true,
}));
const __VLS_53 = __VLS_52({
    type: "success",
    cicle: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_52));
__VLS_54.slots.default;
var __VLS_54;
/** @type {[typeof GyButton, typeof GyButton, ]} */ ;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent(GyButton, new GyButton({
    type: "info",
    cicle: true,
}));
const __VLS_56 = __VLS_55({
    type: "info",
    cicle: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_55));
__VLS_57.slots.default;
var __VLS_57;
/** @type {[typeof GyButton, typeof GyButton, ]} */ ;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent(GyButton, new GyButton({
    type: "warning",
    cicle: true,
}));
const __VLS_59 = __VLS_58({
    type: "warning",
    cicle: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_58));
__VLS_60.slots.default;
var __VLS_60;
/** @type {[typeof GyButton, typeof GyButton, ]} */ ;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent(GyButton, new GyButton({
    type: "danger",
    cicle: true,
}));
const __VLS_62 = __VLS_61({
    type: "danger",
    cicle: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
__VLS_63.slots.default;
var __VLS_63;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
/** @type {[typeof GyButton, typeof GyButton, ]} */ ;
// @ts-ignore
const __VLS_64 = __VLS_asFunctionalComponent(GyButton, new GyButton({
    type: "primary",
    disabled: true,
}));
const __VLS_65 = __VLS_64({
    type: "primary",
    disabled: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_64));
__VLS_66.slots.default;
var __VLS_66;
/** @type {[typeof GyButton, typeof GyButton, ]} */ ;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent(GyButton, new GyButton({
    type: "success",
    disabled: true,
}));
const __VLS_68 = __VLS_67({
    type: "success",
    disabled: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_67));
__VLS_69.slots.default;
var __VLS_69;
/** @type {[typeof GyButton, typeof GyButton, ]} */ ;
// @ts-ignore
const __VLS_70 = __VLS_asFunctionalComponent(GyButton, new GyButton({
    type: "info",
    disabled: true,
}));
const __VLS_71 = __VLS_70({
    type: "info",
    disabled: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_70));
__VLS_72.slots.default;
var __VLS_72;
/** @type {[typeof GyButton, typeof GyButton, ]} */ ;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent(GyButton, new GyButton({
    type: "warning",
    disabled: true,
}));
const __VLS_74 = __VLS_73({
    type: "warning",
    disabled: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
__VLS_75.slots.default;
var __VLS_75;
/** @type {[typeof GyButton, typeof GyButton, ]} */ ;
// @ts-ignore
const __VLS_76 = __VLS_asFunctionalComponent(GyButton, new GyButton({
    type: "danger",
    disabled: true,
}));
const __VLS_77 = __VLS_76({
    type: "danger",
    disabled: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_76));
__VLS_78.slots.default;
var __VLS_78;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "card-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
/** @type {[typeof GyCard, typeof GyCard, ]} */ ;
// @ts-ignore
const __VLS_79 = __VLS_asFunctionalComponent(GyCard, new GyCard({
    imgSrc: "https://img.yzcdn.cn/vant/cat.jpeg",
    width: (300),
    imgHeight: (100),
    summary: "这是一只猫",
}));
const __VLS_80 = __VLS_79({
    imgSrc: "https://img.yzcdn.cn/vant/cat.jpeg",
    width: (300),
    imgHeight: (100),
    summary: "这是一只猫",
}, ...__VLS_functionalComponentArgsRest(__VLS_79));
__VLS_81.slots.default;
{
    const { footer: __VLS_thisSlot } = __VLS_81.slots;
    /** @type {[typeof GyButton, typeof GyButton, ]} */ ;
    // @ts-ignore
    const __VLS_82 = __VLS_asFunctionalComponent(GyButton, new GyButton({
        type: "primary",
    }));
    const __VLS_83 = __VLS_82({
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_82));
    __VLS_84.slots.default;
    var __VLS_84;
}
var __VLS_81;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "dialog-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
/** @type {[typeof GyButton, typeof GyButton, ]} */ ;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent(GyButton, new GyButton(Object.assign({ 'onClick': {} }, { type: "primary", round: true })));
const __VLS_86 = __VLS_85(Object.assign({ 'onClick': {} }, { type: "primary", round: true }), ...__VLS_functionalComponentArgsRest(__VLS_85));
let __VLS_88;
let __VLS_89;
let __VLS_90;
const __VLS_91 = {
    onClick: (__VLS_ctx.handleShow)
};
__VLS_87.slots.default;
var __VLS_87;
/** @type {[typeof GyDialog, typeof GyDialog, ]} */ ;
// @ts-ignore
const __VLS_92 = __VLS_asFunctionalComponent(GyDialog, new GyDialog({
    show: (__VLS_ctx.showDialog),
}));
const __VLS_93 = __VLS_92({
    show: (__VLS_ctx.showDialog),
}, ...__VLS_functionalComponentArgsRest(__VLS_92));
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['button-container']} */ ;
/** @type {__VLS_StyleScopedClasses['card-container']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog-container']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            GyButton: GyButton,
            GyCard: GyCard,
            GyDialog: GyDialog,
            handleClick: handleClick,
            showDialog: showDialog,
            handleShow: handleShow,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
