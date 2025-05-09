// @ts-nocheck
/* eslint-disable */
/* This file was generated by Unframer for Framer project 22de5c086a7b05bc "Logitrade", do not edit manually */
"use client";
import {
  SocialShare
} from "../chunks/chunk-NQADTRKO.js";
import {
  stdin_default as stdin_default3
} from "../chunks/chunk-2QSAZK3W.js";
import {
  stdin_default
} from "../chunks/chunk-XHELX2OP.js";
import "../chunks/chunk-IC5BDERQ.js";
import "../chunks/chunk-VDLII7JS.js";
import {
  stdin_default as stdin_default2
} from "../chunks/chunk-ZBPVQWHD.js";
import "../chunks/chunk-E2YIY67R.js";

// virtual:header/bar
import { Fragment as Fragment2 } from "react";
import { ContextProviders } from "unframer";

// /:https://framerusercontent.com/modules/a6VuWgEy1FDA71misvlI/scyGF2kKOxUW6FbupfjX/D16fIygbF.js
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { addFonts, addPropertyControls, ComponentViewportProvider, ControlType, cx, getFonts, Link, ResolveLinks, RichText, SmartComponentScopedContainer, useActiveVariantCallback, useComponentViewport, useLocaleInfo, useRouter, useVariantState, withCSS } from "unframer";
import { LayoutGroup, motion, MotionConfigContext } from "unframer";
import * as React from "react";
import { useRef } from "react";
var MenuIconFonts = getFonts(stdin_default2);
var HeaderMenuItemFonts = getFonts(stdin_default3);
var ButtonFonts = getFonts(stdin_default);
var SocialShareFonts = getFonts(SocialShare);
var cycleOrder = ["qHZEex1fO", "UrGjQ6lz4", "Bo19GJ2rJ"];
var serializationHash = "framer-gJXIt";
var variantClassNames = { Bo19GJ2rJ: "framer-v-10tnu94", qHZEex1fO: "framer-v-1j27s41", UrGjQ6lz4: "framer-v-8zylt8" };
function addPropertyOverrides(overrides, ...variants) {
  const nextOverrides = {};
  variants?.forEach((variant) => variant && Object.assign(nextOverrides, overrides[variant]));
  return nextOverrides;
}
var transition1 = { damping: 40, delay: 0, mass: 1, stiffness: 600, type: "spring" };
var transition2 = { damping: 40, delay: 0, mass: 1, stiffness: 300, type: "spring" };
var numberToPixelString = (value) => {
  if (typeof value !== "number") return value;
  if (!Number.isFinite(value)) return void 0;
  return Math.max(0, value) + "px";
};
var Transition = ({ value, children }) => {
  const config = React.useContext(MotionConfigContext);
  const transition = value ?? config.transition;
  const contextValue = React.useMemo(() => ({ ...config, transition }), [JSON.stringify(transition)]);
  return /* @__PURE__ */ _jsx(MotionConfigContext.Provider, { value: contextValue, children });
};
var Variants = motion.create(React.Fragment);
var humanReadableVariantMap = { "Phone Open": "Bo19GJ2rJ", Default: "qHZEex1fO", Phone: "UrGjQ6lz4" };
var getProps = ({ gap, height, id, width, ...props }) => {
  return { ...props, QaLzXqGZ8: gap ?? props.QaLzXqGZ8 ?? 24, variant: humanReadableVariantMap[props.variant] ?? props.variant ?? "qHZEex1fO" };
};
var createLayoutDependency = (props, variants) => {
  if (props.layoutDependency) return variants.join("-") + props.layoutDependency;
  return variants.join("-");
};
var Component = /* @__PURE__ */ React.forwardRef(function(props, ref) {
  const fallbackRef = useRef(null);
  const refBinding = ref ?? fallbackRef;
  const defaultLayoutId = React.useId();
  const { activeLocale, setLocale } = useLocaleInfo();
  const componentViewport = useComponentViewport();
  const { style, className, layoutId, variant, QaLzXqGZ8, ...restProps } = getProps(props);
  const { baseVariant, classNames, clearLoadingGesture, gestureHandlers, gestureVariant, isLoading, setGestureState, setVariant, variants } = useVariantState({ cycleOrder, defaultVariant: "qHZEex1fO", ref: refBinding, variant, variantClassNames });
  const layoutDependency = createLayoutDependency(props, variants);
  const { activeVariantCallback, delay } = useActiveVariantCallback(baseVariant);
  const XKaY3MrGu1wrmm12 = activeVariantCallback(async (...args) => {
    setVariant("Uv1Q4EKDw");
  });
  const XKaY3MrGuc090eb = activeVariantCallback(async (...args) => {
    setVariant("Bo19GJ2rJ");
  });
  const XKaY3MrGu8x18ki = activeVariantCallback(async (...args) => {
    setVariant("UrGjQ6lz4");
  });
  const sharedStyleClassNames = [];
  const scopingClassNames = cx(serializationHash, ...sharedStyleClassNames);
  const isDisplayed = () => {
    if (["UrGjQ6lz4", "Bo19GJ2rJ"].includes(baseVariant)) return true;
    return false;
  };
  const isDisplayed1 = () => {
    if (baseVariant === "UrGjQ6lz4") return false;
    return true;
  };
  const isDisplayed2 = () => {
    if (baseVariant === "Bo19GJ2rJ") return false;
    return true;
  };
  const router = useRouter();
  const isDisplayed3 = () => {
    if (baseVariant === "Bo19GJ2rJ") return true;
    return false;
  };
  return /* @__PURE__ */ _jsx(LayoutGroup, { id: layoutId ?? defaultLayoutId, children: /* @__PURE__ */ _jsx(Variants, { animate: variants, initial: false, children: /* @__PURE__ */ _jsx(Transition, { value: transition1, ...addPropertyOverrides({ Bo19GJ2rJ: { value: transition2 }, UrGjQ6lz4: { value: transition2 } }, baseVariant, gestureVariant), children: /* @__PURE__ */ _jsxs(motion.header, { ...restProps, ...gestureHandlers, className: cx(scopingClassNames, "framer-1j27s41", className, classNames), "data-border": true, "data-framer-name": "Default", "data-hide-scrollbars": true, layoutDependency, layoutId: "qHZEex1fO", ref: refBinding, style: { "--border-bottom-width": "1px", "--border-color": "rgba(0, 0, 0, 0.25)", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "solid", "--border-top-width": "0px", backdropFilter: "blur(13px)", backgroundColor: "var(--token-5f948dac-8d73-4e64-9593-778b631dc9a2, rgb(255, 255, 255))", WebkitBackdropFilter: "blur(13px)", ...style }, variants: { Bo19GJ2rJ: { "--border-bottom-width": "0px", backgroundColor: "var(--token-5f948dac-8d73-4e64-9593-778b631dc9a2, rgb(14, 15, 15))" }, UrGjQ6lz4: { "--border-bottom-width": "0px", backgroundColor: "var(--token-5f948dac-8d73-4e64-9593-778b631dc9a2, rgb(14, 15, 15))" } }, ...addPropertyOverrides({ Bo19GJ2rJ: { "data-framer-name": "Phone Open" }, UrGjQ6lz4: { "data-framer-name": "Phone" } }, baseVariant, gestureVariant), children: [/* @__PURE__ */ _jsxs(motion.div, { className: "framer-15cwi2l", "data-framer-name": "Name", layoutDependency, layoutId: "Og_rnZOs8", style: { backgroundColor: "rgba(0, 0, 0, 0)" }, variants: { Bo19GJ2rJ: { backgroundColor: "var(--token-5f948dac-8d73-4e64-9593-778b631dc9a2, rgb(14, 15, 15))" }, UrGjQ6lz4: { backgroundColor: "var(--token-5f948dac-8d73-4e64-9593-778b631dc9a2, rgb(255, 255, 255))" } }, children: [/* @__PURE__ */ _jsx(Link, { href: { webPageId: "djFcOBxgH" }, motionChild: true, nodeId: "fnROOuNtO", openInNewTab: false, scopeId: "D16fIygbF", children: /* @__PURE__ */ _jsx(motion.a, { className: "framer-70z888 framer-6823v9", "data-framer-name": "Logo Container", layoutDependency, layoutId: "fnROOuNtO", children: /* @__PURE__ */ _jsx(motion.div, { className: "framer-1mhdwu4", "data-framer-name": "Logo", layoutDependency, layoutId: "kRwr4Hftz", children: /* @__PURE__ */ _jsx(RichText, { __fromCanvasComponent: true, children: /* @__PURE__ */ _jsx(React.Fragment, { children: /* @__PURE__ */ _jsx(motion.p, { style: { "--font-selector": "R0Y7QmUgVmlldG5hbSBQcm8tNzAw", "--framer-font-family": '"Be Vietnam Pro", "Be Vietnam Pro Placeholder", sans-serif', "--framer-font-size": "24px", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.03em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-f49f2177-1b79-4781-8112-19ce660122c6, rgb(83, 56, 255)))" }, children: "LogiTrade" }) }), className: "framer-v2cskf", "data-framer-name": "Logotype", fonts: ["GF;Be Vietnam Pro-700"], layoutDependency, layoutId: "EMXsXQzl9", style: { "--extracted-r6o4lv": "var(--token-f49f2177-1b79-4781-8112-19ce660122c6, rgb(83, 56, 255))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline" }, verticalAlignment: "top", withExternalLayout: true }) }) }) }), isDisplayed() && /* @__PURE__ */ _jsx(ComponentViewportProvider, { ...addPropertyOverrides({ Bo19GJ2rJ: { height: 60, width: "60px", y: (componentViewport?.y || 0) + 0 + 0 + 5 }, UrGjQ6lz4: { height: 60, width: "60px", y: (componentViewport?.y || 0) + 0 + (((componentViewport?.height || 70) - 0 - 64) / 2 + 0 + 0) + 2 } }, baseVariant, gestureVariant), children: /* @__PURE__ */ _jsx(SmartComponentScopedContainer, { className: "framer-1rs8y86-container", "data-framer-name": "Menu Icon", layoutDependency, layoutId: "WmlLzkFXy-container", name: "Menu Icon", nodeId: "WmlLzkFXy", rendersWithMotion: true, scopeId: "D16fIygbF", children: /* @__PURE__ */ _jsx(stdin_default2, { height: "100%", id: "WmlLzkFXy", layoutId: "WmlLzkFXy", name: "Menu Icon", variant: "S2IdlCyLh", width: "100%", XKaY3MrGu: XKaY3MrGu1wrmm12, ...addPropertyOverrides({ Bo19GJ2rJ: { style: { height: "100%", width: "100%" }, variant: "SE7k_fhio", XKaY3MrGu: XKaY3MrGu8x18ki }, UrGjQ6lz4: { style: { height: "100%", width: "100%" }, XKaY3MrGu: XKaY3MrGuc090eb } }, baseVariant, gestureVariant) }) }) })] }), isDisplayed1() && /* @__PURE__ */ _jsxs(motion.div, { className: "framer-1ypqi4z", "data-framer-name": "Links", "data-hide-scrollbars": true, layoutDependency, layoutId: "svfPwRcoX", children: [/* @__PURE__ */ _jsxs(motion.nav, { className: "framer-1fw1f2a", "data-framer-name": "Nav", "data-hide-scrollbars": true, layoutDependency, layoutId: "xmeabIprx", style: { "--rxc95f": numberToPixelString(QaLzXqGZ8) }, children: [isDisplayed2() && /* @__PURE__ */ _jsx(ResolveLinks, { links: [{ href: { hash: ":XfR1e3ijK", webPageId: "djFcOBxgH" }, implicitPathVariables: void 0 }], children: (resolvedLinks) => /* @__PURE__ */ _jsx(ComponentViewportProvider, { height: 31, y: (componentViewport?.y || 0) + (20 + ((componentViewport?.height || 80) - 40 - 48) / 2) + 4 + 4.5, children: /* @__PURE__ */ _jsx(SmartComponentScopedContainer, { className: "framer-1h9tv4h-container", "data-framer-name": "Solutions", layoutDependency, layoutId: "jcw8LU0ae-container", name: "Solutions", nodeId: "jcw8LU0ae", rendersWithMotion: true, scopeId: "D16fIygbF", children: /* @__PURE__ */ _jsx(stdin_default3, { DApvjrdfG: "Advantages", height: "100%", id: "jcw8LU0ae", layoutId: "jcw8LU0ae", name: "Solutions", qsfw0ynrM: resolvedLinks[0], variant: "xkfgwlGWC", width: "100%" }) }) }) }), isDisplayed2() && /* @__PURE__ */ _jsx(ResolveLinks, { links: [{ href: { hash: ":N6OCHKwMF", webPageId: "djFcOBxgH" }, implicitPathVariables: void 0 }], children: (resolvedLinks1) => /* @__PURE__ */ _jsx(ComponentViewportProvider, { height: 31, y: (componentViewport?.y || 0) + (20 + ((componentViewport?.height || 80) - 40 - 48) / 2) + 4 + 4.5, children: /* @__PURE__ */ _jsx(SmartComponentScopedContainer, { className: "framer-sj3vll-container", "data-framer-name": "Use Cases", layoutDependency, layoutId: "KDIHc0Rbh-container", name: "Use Cases", nodeId: "KDIHc0Rbh", rendersWithMotion: true, scopeId: "D16fIygbF", children: /* @__PURE__ */ _jsx(stdin_default3, { DApvjrdfG: "Features", height: "100%", id: "KDIHc0Rbh", layoutId: "KDIHc0Rbh", name: "Use Cases", qsfw0ynrM: resolvedLinks1[0], variant: "xkfgwlGWC", width: "100%" }) }) }) }), isDisplayed2() && /* @__PURE__ */ _jsx(ResolveLinks, { links: [{ href: { webPageId: "djFcOBxgH" }, implicitPathVariables: void 0 }], children: (resolvedLinks2) => /* @__PURE__ */ _jsx(ComponentViewportProvider, { height: 31, y: (componentViewport?.y || 0) + (20 + ((componentViewport?.height || 80) - 40 - 48) / 2) + 4 + 4.5, children: /* @__PURE__ */ _jsx(SmartComponentScopedContainer, { className: "framer-aiowga-container", "data-framer-name": "Resources", layoutDependency, layoutId: "mF46ck1XM-container", name: "Resources", nodeId: "mF46ck1XM", rendersWithMotion: true, scopeId: "D16fIygbF", children: /* @__PURE__ */ _jsx(stdin_default3, { DApvjrdfG: "Integrations", height: "100%", id: "mF46ck1XM", layoutId: "mF46ck1XM", name: "Resources", qsfw0ynrM: resolvedLinks2[0], variant: "xkfgwlGWC", width: "100%" }) }) }) }), isDisplayed2() && /* @__PURE__ */ _jsx(motion.div, { className: "framer-qiee6f", "data-framer-name": "Other Links", layoutDependency, layoutId: "dMfPEuxRh", style: { "--rxc95f": numberToPixelString(QaLzXqGZ8) }, children: /* @__PURE__ */ _jsx(ResolveLinks, { links: [{ href: { webPageId: "M8YVSMxgJ" }, implicitPathVariables: void 0 }], children: (resolvedLinks3) => /* @__PURE__ */ _jsx(ComponentViewportProvider, { height: 31, y: (componentViewport?.y || 0) + (20 + ((componentViewport?.height || 80) - 40 - 48) / 2) + 4 + 0 + 4.5, children: /* @__PURE__ */ _jsx(SmartComponentScopedContainer, { className: "framer-z10w7g-container", "data-framer-name": "Pricing", layoutDependency, layoutId: "h3YhDNSvw-container", name: "Pricing", nodeId: "h3YhDNSvw", rendersWithMotion: true, scopeId: "D16fIygbF", children: /* @__PURE__ */ _jsx(stdin_default3, { DApvjrdfG: "Get Started", height: "100%", id: "h3YhDNSvw", layoutId: "h3YhDNSvw", name: "Pricing", qsfw0ynrM: resolvedLinks3[0], variant: "xkfgwlGWC", width: "100%" }) }) }) }) }), isDisplayed3() && /* @__PURE__ */ _jsx(motion.div, { className: "framer-10gd4a3", "data-framer-name": "Spacer", layoutDependency, layoutId: "r27HuVYoR" }), isDisplayed3() && /* @__PURE__ */ _jsxs(motion.div, { className: "framer-oii7zw", "data-framer-name": "Menu", "data-hide-scrollbars": true, layoutDependency, layoutId: "goPMboEQF", children: [/* @__PURE__ */ _jsx(ResolveLinks, { links: [{ href: { hash: ":XfR1e3ijK", webPageId: "djFcOBxgH" }, implicitPathVariables: void 0 }, { href: { hash: ":XfR1e3ijK", webPageId: "djFcOBxgH" }, implicitPathVariables: void 0 }], children: (resolvedLinks4) => /* @__PURE__ */ _jsx(ComponentViewportProvider, { height: 31, ...addPropertyOverrides({ Bo19GJ2rJ: { y: (componentViewport?.y || 0) + 0 + 70 + 0 + 0 + 0 + 26 + 0 + 25 } }, baseVariant, gestureVariant), children: /* @__PURE__ */ _jsx(SmartComponentScopedContainer, { className: "framer-1iqqpls-container", "data-framer-name": "Solutions", layoutDependency, layoutId: "cRvg4bCs9-container", name: "Solutions", nodeId: "cRvg4bCs9", rendersWithMotion: true, scopeId: "D16fIygbF", children: /* @__PURE__ */ _jsx(stdin_default3, { DApvjrdfG: "Advantages", height: "100%", id: "cRvg4bCs9", layoutId: "cRvg4bCs9", name: "Solutions", qsfw0ynrM: resolvedLinks4[0], variant: "xkfgwlGWC", width: "100%", ...addPropertyOverrides({ Bo19GJ2rJ: { qsfw0ynrM: resolvedLinks4[1] } }, baseVariant, gestureVariant) }) }) }) }), isDisplayed3() && /* @__PURE__ */ _jsx(motion.div, { className: "framer-1jmhxw", "data-framer-name": "Separator", layoutDependency, layoutId: "Wz1Ey_aIJ", style: { backgroundColor: "rgb(34, 34, 34)", opacity: 0.18 } }), /* @__PURE__ */ _jsx(motion.div, { className: "framer-91lj75", "data-framer-name": "Separator", layoutDependency, layoutId: "X1gWRK9vR", style: { backgroundColor: "rgb(34, 34, 34)", opacity: 0.18 } }), /* @__PURE__ */ _jsx(motion.div, { className: "framer-1jl1jzn", "data-framer-name": "Separator", layoutDependency, layoutId: "UhU4Mgxuk", style: { backgroundColor: "rgb(34, 34, 34)", opacity: 0.18 } }), /* @__PURE__ */ _jsx(motion.div, { className: "framer-1gwotjg", "data-framer-name": "Separator", layoutDependency, layoutId: "aOu7Jtc6S", style: { backgroundColor: "rgb(34, 34, 34)", opacity: 0.18 } }), /* @__PURE__ */ _jsx(ResolveLinks, { links: [{ href: { hash: ":N6OCHKwMF", webPageId: "djFcOBxgH" }, implicitPathVariables: void 0 }, { href: { hash: ":N6OCHKwMF", webPageId: "djFcOBxgH" }, implicitPathVariables: void 0 }], children: (resolvedLinks5) => /* @__PURE__ */ _jsx(ComponentViewportProvider, { height: 31, ...addPropertyOverrides({ Bo19GJ2rJ: { y: (componentViewport?.y || 0) + 0 + 70 + 0 + 0 + 0 + 26 + 0 + 105 } }, baseVariant, gestureVariant), children: /* @__PURE__ */ _jsx(SmartComponentScopedContainer, { className: "framer-17ldzbh-container", "data-framer-name": "Use Cases", layoutDependency, layoutId: "ILR6f1X3O-container", name: "Use Cases", nodeId: "ILR6f1X3O", rendersWithMotion: true, scopeId: "D16fIygbF", children: /* @__PURE__ */ _jsx(stdin_default3, { DApvjrdfG: "Features", height: "100%", id: "ILR6f1X3O", layoutId: "ILR6f1X3O", name: "Use Cases", qsfw0ynrM: resolvedLinks5[0], variant: "xkfgwlGWC", width: "100%", ...addPropertyOverrides({ Bo19GJ2rJ: { qsfw0ynrM: resolvedLinks5[1] } }, baseVariant, gestureVariant) }) }) }) }), /* @__PURE__ */ _jsx(ResolveLinks, { links: [{ href: { webPageId: "djFcOBxgH" }, implicitPathVariables: void 0 }, { href: { webPageId: "djFcOBxgH" }, implicitPathVariables: void 0 }], children: (resolvedLinks6) => /* @__PURE__ */ _jsx(ComponentViewportProvider, { height: 31, ...addPropertyOverrides({ Bo19GJ2rJ: { y: (componentViewport?.y || 0) + 0 + 70 + 0 + 0 + 0 + 26 + 0 + 185 } }, baseVariant, gestureVariant), children: /* @__PURE__ */ _jsx(SmartComponentScopedContainer, { className: "framer-1cme1tj-container", "data-framer-name": "Resources", layoutDependency, layoutId: "Ve8KWYWfA-container", name: "Resources", nodeId: "Ve8KWYWfA", rendersWithMotion: true, scopeId: "D16fIygbF", children: /* @__PURE__ */ _jsx(stdin_default3, { DApvjrdfG: "Integrations", height: "100%", id: "Ve8KWYWfA", layoutId: "Ve8KWYWfA", name: "Resources", qsfw0ynrM: resolvedLinks6[0], variant: "xkfgwlGWC", width: "100%", ...addPropertyOverrides({ Bo19GJ2rJ: { qsfw0ynrM: resolvedLinks6[1] } }, baseVariant, gestureVariant) }) }) }) }), /* @__PURE__ */ _jsx(motion.div, { className: "framer-76ql74", "data-framer-name": "Other Links", layoutDependency, layoutId: "nIKSCdSS5", style: { "--rxc95f": numberToPixelString(QaLzXqGZ8) }, children: /* @__PURE__ */ _jsx(ResolveLinks, { links: [{ href: { hash: ":iIPcp0kPP", webPageId: "djFcOBxgH" }, implicitPathVariables: void 0 }, { href: { hash: ":iIPcp0kPP", webPageId: "djFcOBxgH" }, implicitPathVariables: void 0 }], children: (resolvedLinks7) => /* @__PURE__ */ _jsx(ComponentViewportProvider, { height: 31, ...addPropertyOverrides({ Bo19GJ2rJ: { y: (componentViewport?.y || 0) + 0 + 70 + 0 + 0 + 0 + 26 + 0 + 265 + 4.5 } }, baseVariant, gestureVariant), children: /* @__PURE__ */ _jsx(SmartComponentScopedContainer, { className: "framer-1khxjc3-container", "data-framer-name": "Pricing", layoutDependency, layoutId: "qnwo18slm-container", name: "Pricing", nodeId: "qnwo18slm", rendersWithMotion: true, scopeId: "D16fIygbF", children: /* @__PURE__ */ _jsx(stdin_default3, { DApvjrdfG: "Get Started", height: "100%", id: "qnwo18slm", layoutId: "qnwo18slm", name: "Pricing", qsfw0ynrM: resolvedLinks7[0], variant: "xkfgwlGWC", width: "100%", ...addPropertyOverrides({ Bo19GJ2rJ: { qsfw0ynrM: resolvedLinks7[1] } }, baseVariant, gestureVariant) }) }) }) }) }), /* @__PURE__ */ _jsx(motion.div, { className: "framer-17nbuk4", "data-framer-name": "Separator", layoutDependency, layoutId: "wa7NrXIXY", style: { backgroundColor: "rgb(34, 34, 34)", opacity: 0.18 } })] })] }), isDisplayed3() && /* @__PURE__ */ _jsx(motion.div, { className: "framer-aspql4", "data-framer-name": "Spacer", layoutDependency, layoutId: "vbYtnk9Cq" }), /* @__PURE__ */ _jsx(motion.div, { className: "framer-1c6noub", "data-framer-name": "Actions", layoutDependency, layoutId: "YJTpwFe2W", children: /* @__PURE__ */ _jsx(ResolveLinks, { links: [{ href: { webPageId: "M8YVSMxgJ" }, implicitPathVariables: void 0 }, { href: { webPageId: "M8YVSMxgJ" }, implicitPathVariables: void 0 }], children: (resolvedLinks8) => /* @__PURE__ */ _jsx(ComponentViewportProvider, { height: 48, y: (componentViewport?.y || 0) + (20 + ((componentViewport?.height || 80) - 40 - 48) / 2) + 0 + 0, ...addPropertyOverrides({ Bo19GJ2rJ: { y: (componentViewport?.y || 0) + 0 + 70 + 0 + 396 + 0 + 0 } }, baseVariant, gestureVariant), children: /* @__PURE__ */ _jsx(SmartComponentScopedContainer, { className: "framer-obnqmc-container", layoutDependency, layoutId: "snjl3LbyE-container", nodeId: "snjl3LbyE", rendersWithMotion: true, scopeId: "D16fIygbF", children: /* @__PURE__ */ _jsx(stdin_default, { ARnLq3zHD: resolvedLinks8[0], CUDP1X95y: "Get Started", height: "100%", id: "snjl3LbyE", layoutId: "snjl3LbyE", pK7K5HOIP: "ph:arrow-up-right", RAlASxb4E: false, variant: "npOhIzqja", width: "100%", ...addPropertyOverrides({ Bo19GJ2rJ: { ARnLq3zHD: resolvedLinks8[1] } }, baseVariant, gestureVariant) }) }) }) }) }), isDisplayed3() && /* @__PURE__ */ _jsx(motion.div, { className: "framer-16hafgp", "data-framer-name": "Spacer", layoutDependency, layoutId: "ByAkKCtKO" }), isDisplayed3() && /* @__PURE__ */ _jsx(ComponentViewportProvider, { children: /* @__PURE__ */ _jsx(SmartComponentScopedContainer, { className: "framer-1ff5slb-container", isAuthoredByUser: true, isModuleExternal: true, layoutDependency, layoutId: "fphkGR2Xd-container", nodeId: "fphkGR2Xd", rendersWithMotion: true, scopeId: "D16fIygbF", style: { opacity: 0.25 }, children: /* @__PURE__ */ _jsx(SocialShare, { border: true, borderColor: "var(--token-20832d6c-6be5-455d-99ea-51eb6fbc6e93, rgb(255, 255, 255))", borderSize: 1, gap: 15, height: "100%", hoverBright: 1.2, icons: [{ background: "var(--token-5f948dac-8d73-4e64-9593-778b631dc9a2, rgb(15, 15, 16))", customColor: true, customLink: false, foreground: "var(--token-20832d6c-6be5-455d-99ea-51eb6fbc6e93, rgb(255, 255, 255))", link: "", network: "x", scale: 1.2 }, { background: "var(--token-5f948dac-8d73-4e64-9593-778b631dc9a2, rgb(15, 15, 16))", customColor: true, customLink: false, foreground: "var(--token-20832d6c-6be5-455d-99ea-51eb6fbc6e93, rgb(255, 255, 255))", link: "", network: "facebook", scale: 1.2 }, { background: "var(--token-5f948dac-8d73-4e64-9593-778b631dc9a2, rgb(15, 15, 16))", customColor: true, customLink: false, foreground: "var(--token-20832d6c-6be5-455d-99ea-51eb6fbc6e93, rgb(255, 255, 255))", link: "", network: "linkedin", scale: 1.2 }, { background: "var(--token-5f948dac-8d73-4e64-9593-778b631dc9a2, rgb(15, 15, 16))", customColor: true, customLink: false, foreground: "var(--token-20832d6c-6be5-455d-99ea-51eb6fbc6e93, rgb(255, 255, 255))", link: "", network: "mailto", scale: 1.2 }], id: "fphkGR2Xd", layoutId: "fphkGR2Xd", radius: 100, size: 34, width: "100%" }) }) }), isDisplayed3() && /* @__PURE__ */ _jsx(motion.div, { className: "framer-nbxze0", "data-framer-name": "Spacer", layoutDependency, layoutId: "X09eWDb7x" })] })] }) }) }) });
});
var css = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-gJXIt.framer-6823v9, .framer-gJXIt .framer-6823v9 { display: block; }", ".framer-gJXIt.framer-1j27s41 { align-content: center; align-items: center; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 0px; height: 80px; justify-content: flex-start; overflow: visible; padding: 20px; position: relative; width: 1200px; }", ".framer-gJXIt .framer-15cwi2l { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: flex-start; overflow: visible; padding: 0px; position: relative; width: 217px; }", ".framer-gJXIt .framer-70z888 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; text-decoration: none; width: min-content; }", ".framer-gJXIt .framer-1mhdwu4 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: hidden; padding: 0px; position: relative; width: min-content; }", ".framer-gJXIt .framer-v2cskf { flex: none; height: auto; position: relative; white-space: pre; width: auto; }", ".framer-gJXIt .framer-1rs8y86-container, .framer-gJXIt .framer-1h9tv4h-container, .framer-gJXIt .framer-sj3vll-container, .framer-gJXIt .framer-aiowga-container, .framer-gJXIt .framer-z10w7g-container, .framer-gJXIt .framer-1iqqpls-container, .framer-gJXIt .framer-17ldzbh-container, .framer-gJXIt .framer-1cme1tj-container, .framer-gJXIt .framer-1khxjc3-container, .framer-gJXIt .framer-obnqmc-container, .framer-gJXIt .framer-1ff5slb-container { flex: none; height: auto; position: relative; width: auto; }", ".framer-gJXIt .framer-1ypqi4z { align-content: center; align-items: center; display: flex; flex: 1 0 0px; flex-direction: row; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: center; overflow: hidden; padding: 0px; position: relative; width: 1px; }", ".framer-gJXIt .framer-1fw1f2a { align-content: center; align-items: center; display: flex; flex: 1 0 0px; flex-direction: row; flex-wrap: nowrap; gap: var(--rxc95f); height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 1px; }", ".framer-gJXIt .framer-qiee6f, .framer-gJXIt .framer-76ql74 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: var(--rxc95f); height: 40px; justify-content: center; overflow: visible; padding: 0px; position: relative; width: min-content; }", ".framer-gJXIt .framer-10gd4a3 { flex: 1 0 0px; height: 26px; overflow: visible; position: relative; width: 1px; }", ".framer-gJXIt .framer-oii7zw { align-content: center; align-items: center; display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; gap: 24px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 1px; }", ".framer-gJXIt .framer-1jmhxw, .framer-gJXIt .framer-91lj75, .framer-gJXIt .framer-1jl1jzn, .framer-gJXIt .framer-1gwotjg, .framer-gJXIt .framer-17nbuk4 { flex: none; height: 1px; overflow: visible; position: relative; width: 100%; }", ".framer-gJXIt .framer-aspql4 { flex: 1 0 0px; height: 0px; overflow: visible; position: relative; width: 1px; }", ".framer-gJXIt .framer-1c6noub { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 8px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: min-content; }", ".framer-gJXIt .framer-16hafgp { flex: none; height: 6px; overflow: visible; position: relative; width: 100px; }", ".framer-gJXIt .framer-nbxze0 { flex: none; height: 23px; overflow: visible; position: relative; width: 198px; }", ".framer-gJXIt.framer-v-8zylt8.framer-1j27s41 { flex-direction: column; height: 70px; justify-content: center; overflow: hidden; padding: 0px; width: 390px; }", ".framer-gJXIt.framer-v-8zylt8 .framer-15cwi2l { gap: unset; height: 64px; justify-content: space-between; padding: 0px 0px 0px 15px; width: 100%; z-index: 2; }", ".framer-gJXIt.framer-v-8zylt8 .framer-1rs8y86-container, .framer-gJXIt.framer-v-10tnu94 .framer-1rs8y86-container { aspect-ratio: 1 / 1; height: var(--framer-aspect-ratio-supported, 60px); width: 60px; }", ".framer-gJXIt.framer-v-10tnu94.framer-1j27s41 { flex-direction: column; height: min-content; max-height: calc(var(--framer-viewport-height, 100vh) * 1); min-height: calc(var(--framer-viewport-height, 100vh) * 1); overflow: auto; overscroll-behavior: contain; padding: 0px; width: 390px; }", ".framer-gJXIt.framer-v-10tnu94 .framer-15cwi2l { gap: unset; height: 70px; justify-content: space-between; padding: 0px 0px 0px 15px; position: sticky; top: 0px; width: 100%; z-index: 3; }", ".framer-gJXIt.framer-v-10tnu94 .framer-1ypqi4z { flex: none; flex-direction: column; padding: 0px 15px 0px 15px; width: 100%; }", ".framer-gJXIt.framer-v-10tnu94 .framer-1fw1f2a { align-content: flex-start; align-items: flex-start; flex: none; flex-direction: column; flex-wrap: wrap; gap: 0px; width: 100%; }", ".framer-gJXIt.framer-v-10tnu94 .framer-10gd4a3 { flex: none; order: 0; width: 100%; }", ".framer-gJXIt.framer-v-10tnu94 .framer-oii7zw { flex: none; order: 5; width: 100%; }", ".framer-gJXIt.framer-v-10tnu94 .framer-1iqqpls-container { order: 1; }", ".framer-gJXIt.framer-v-10tnu94 .framer-1jmhxw { order: 0; }", ".framer-gJXIt.framer-v-10tnu94 .framer-91lj75 { order: 4; }", ".framer-gJXIt.framer-v-10tnu94 .framer-1jl1jzn { order: 6; }", ".framer-gJXIt.framer-v-10tnu94 .framer-1gwotjg { order: 2; }", ".framer-gJXIt.framer-v-10tnu94 .framer-17ldzbh-container { order: 3; }", ".framer-gJXIt.framer-v-10tnu94 .framer-1cme1tj-container { order: 5; }", ".framer-gJXIt.framer-v-10tnu94 .framer-76ql74 { order: 7; }", ".framer-gJXIt.framer-v-10tnu94 .framer-17nbuk4 { order: 8; }", ".framer-gJXIt.framer-v-10tnu94 .framer-aspql4 { flex: none; width: 100%; }", ".framer-gJXIt.framer-v-10tnu94 .framer-1c6noub { flex-direction: column; gap: 12px; justify-content: flex-start; width: 100%; }", '.framer-gJXIt[data-border="true"]::after, .framer-gJXIt [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }', '.framer-gJXIt[data-hide-scrollbars="true"]::-webkit-scrollbar, .framer-gJXIt [data-hide-scrollbars="true"]::-webkit-scrollbar { width: 0px; height: 0px; }', '.framer-gJXIt[data-hide-scrollbars="true"]::-webkit-scrollbar-thumb, .framer-gJXIt [data-hide-scrollbars="true"]::-webkit-scrollbar-thumb { background: transparent; }', '.framer-gJXIt[data-hide-scrollbars="true"], .framer-gJXIt [data-hide-scrollbars="true"] { scrollbar-width: none; }'];
var FramerD16fIygbF = withCSS(Component, css, "framer-gJXIt");
var stdin_default4 = FramerD16fIygbF;
FramerD16fIygbF.displayName = "Header/Bar";
FramerD16fIygbF.defaultProps = { height: 80, width: 1200 };
addPropertyControls(FramerD16fIygbF, { variant: { options: ["qHZEex1fO", "UrGjQ6lz4", "Bo19GJ2rJ"], optionTitles: ["Default", "Phone", "Phone Open"], title: "Variant", type: ControlType.Enum }, QaLzXqGZ8: { defaultValue: 24, min: 0, title: "Gap", type: ControlType.Number } });
addFonts(FramerD16fIygbF, [{ explicitInter: true, fonts: [{ family: "Be Vietnam Pro", source: "google", style: "normal", url: "https://fonts.gstatic.com/s/bevietnampro/v11/QdVMSTAyLFyeg_IDWvOJmVES_HSMIF83T7wrcwap.woff2", weight: "700" }] }, ...MenuIconFonts, ...HeaderMenuItemFonts, ...ButtonFonts, ...SocialShareFonts], { supportsExplicitInterCodegen: true });

// virtual:header/bar
import { WithFramerBreakpoints } from "unframer";
import { jsx } from "react/jsx-runtime";
var locales = [];
var defaultResponsiveVariants = {
  "base": "UrGjQ6lz4",
  "xl": "qHZEex1fO"
};
stdin_default4.Responsive = ({ locale, ...rest }) => {
  return /* @__PURE__ */ jsx(
    ContextProviders,
    {
      routes: { "Etmru3KG0": { "path": "/404" }, "M8YVSMxgJ": { "path": "/book-a-demo" }, "djFcOBxgH": { "path": "/" } },
      children: /* @__PURE__ */ jsx(
        WithFramerBreakpoints,
        {
          Component: stdin_default4,
          variants: defaultResponsiveVariants,
          ...rest
        }
      ),
      framerSiteId: "22de5c086a7b05bc94c7df155862c055fe61eda0d80f29da87697e356b6bca4b",
      locale,
      locales
    }
  );
};
function ComponentWithRoot({ locale, ...rest }) {
  return /* @__PURE__ */ jsx(
    ContextProviders,
    {
      routes: {
        "Etmru3KG0": {
          "path": "/404"
        },
        "M8YVSMxgJ": {
          "path": "/book-a-demo"
        },
        "djFcOBxgH": {
          "path": "/"
        }
      },
      children: /* @__PURE__ */ jsx(stdin_default4, { ...rest }),
      framerSiteId: "22de5c086a7b05bc94c7df155862c055fe61eda0d80f29da87697e356b6bca4b",
      locale,
      locales
    }
  );
}
Object.assign(ComponentWithRoot, stdin_default4);
export {
  ComponentWithRoot as default
};
