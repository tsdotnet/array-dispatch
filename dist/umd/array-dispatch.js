(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tsdotnet/array-copy')) :
    typeof define === 'function' && define.amd ? define(['exports', '@tsdotnet/array-copy'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.tsdotnet = global.tsdotnet || {}, global.tsdotnet.arrayDispatch = global.tsdotnet.arrayDispatch || {}), global.tsdotnet.arrayCopy));
})(this, (function (exports, arrayCopy) { 'use strict';

    function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

    var arrayCopy__default = /*#__PURE__*/_interopDefault(arrayCopy);

    /*!
     * @author electricessence / https://github.com/electricessence/
     * Licensing: MIT
     */
    const VOID0 = void 0;
    function dispatch(listeners, payload, trap) {
        dispatch.unsafe(arrayCopy__default.default(listeners), payload, trap);
    }
    (function (dispatch) {
        function unsafe(listeners, payload, trap) {
            if (listeners && listeners.length) {
                for (let i = 0, len = listeners.length; i < len; i++) {
                    const fn = listeners[i];
                    if (!fn)
                        continue;
                    try {
                        fn(payload);
                    }
                    catch (ex) {
                        if (!trap)
                            throw ex;
                        else if (typeof trap === 'function')
                            trap(ex, i);
                    }
                }
            }
        }
        dispatch.unsafe = unsafe;
        function mapped(listeners, payload, trap) {
            if (!listeners)
                return listeners;
            const result = arrayCopy__default.default(listeners);
            if (listeners.length) {
                for (let i = 0, len = result.length; i < len; i++) {
                    const fn = result[i];
                    try {
                        result[i] = fn
                            ? fn(payload)
                            : VOID0;
                    }
                    catch (ex) {
                        result[i] = VOID0;
                        if (!trap)
                            throw ex;
                        else if (typeof trap === 'function')
                            trap(ex, i);
                    }
                }
            }
            return result;
        }
        dispatch.mapped = mapped;
    })(dispatch || (dispatch = {}));
    var dispatch_default = dispatch;

    exports.default = dispatch_default;
    exports.dispatch = dispatch;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=array-dispatch.js.map
