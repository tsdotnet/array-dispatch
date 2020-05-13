"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatch = void 0;
const tslib_1 = require("tslib");
const array_copy_1 = tslib_1.__importDefault(require("@tsdotnet/array-copy"));
const VOID0 = void 0;
/**
 * Simply takes a payload and passes it to all the listeners.
 * Makes a arrayCopy of the listeners before calling dispatchUnsafe.
 *
 * @param listeners
 * @param payload
 * @param trap
 */
function dispatch(listeners, payload, trap) {
    dispatch.unsafe(array_copy_1.default(listeners), payload, trap);
}
exports.dispatch = dispatch;
(function (dispatch) {
    /**
     * Simply takes a payload and passes it to all the listeners.
     *
     * While dispatching:
     * * This is an unsafe method if by chance any of the listeners modify the array.
     * * It cannot prevent changes to the payload.
     *
     * Improving safety:
     * * Only use a local array that isn't exposed to the listeners.
     * * Use the dispatch method instead as it makes a arrayCopy of the listeners array.
     * * Freeze the listeners array so it can't be modified.
     * * Freeze the payload.
     *
     * Specifying trap will catch any errors and pass them along if trap is a function.
     * A payload is used instead of arguments for easy typing.
     *
     *
     * @param listeners
     * @param payload
     * @param trap
     */
    function unsafe(listeners, payload, trap) {
        if (listeners && listeners.length) {
            for (let i = 0, len = listeners.length; i < len; i++) {
                const fn = listeners[i];
                if (!fn)
                    continue; // Ignore null refs.
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
    /**
     * Simply takes a payload and passes it to all the listeners.
     * Returns the results in an array that matches the indexes of the listeners.
     *
     * @param listeners
     * @param payload
     * @param trap
     * @returns {any}
     */
    function mapped(listeners, payload, trap) {
        if (!listeners)
            return listeners;
        // Reuse the arrayCopy as the array result.
        const result = array_copy_1.default(listeners);
        if (listeners.length) {
            for (let i = 0, len = result.length; i < len; i++) {
                const fn = result[i];
                try {
                    result[i] = fn // Ignore null refs.
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
})(dispatch = exports.dispatch || (exports.dispatch = {}));
exports.default = dispatch;
//# sourceMappingURL=dispatch.js.map