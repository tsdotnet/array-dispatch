import arrayCopy from '@tsdotnet/array-copy';

/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
const VOID0 = void 0;
function dispatch(listeners, payload, trap) {
    dispatch.unsafe(arrayCopy(listeners), payload, trap);
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
        const result = arrayCopy(listeners);
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
var dispatch$1 = dispatch;

export { dispatch$1 as default, dispatch };
//# sourceMappingURL=dispatch.js.map
