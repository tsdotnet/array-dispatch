"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatch = dispatch;
const tslib_1 = require("tslib");
const array_copy_1 = tslib_1.__importDefault(require("@tsdotnet/array-copy"));
const VOID0 = void 0;
function dispatch(listeners, payload, trap) {
    dispatch.unsafe((0, array_copy_1.default)(listeners), payload, trap);
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
        const result = (0, array_copy_1.default)(listeners);
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
})(dispatch || (exports.dispatch = dispatch = {}));
exports.default = dispatch;
//# sourceMappingURL=dispatch.js.map