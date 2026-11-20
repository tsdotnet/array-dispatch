/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
import { Selector } from '@tsdotnet/common-interfaces';
export type DispatchErrorHandler = (ex: any, index: number) => void;
export declare function dispatch<T>(listeners: ArrayLike<Selector<T, any>>, payload: T, trap?: boolean | DispatchErrorHandler): void;
export declare namespace dispatch {
    function unsafe<T>(listeners: ArrayLike<Selector<T, any>>, payload: T, trap?: boolean | DispatchErrorHandler): void;
    function mapped<T, TResult>(listeners: ArrayLike<Selector<T, TResult>>, payload: T, trap?: boolean | DispatchErrorHandler): TResult[];
}
export default dispatch;
