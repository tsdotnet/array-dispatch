import { describe, it, expect, vi } from 'vitest';
import dispatch from '../src/dispatch.js';

describe('dispatch', () => {
	it('should call all listeners with the payload', () => {
		const listener1 = vi.fn();
		const listener2 = vi.fn();
		const payload = { test: 'data' };

		dispatch([listener1, listener2], payload);

		expect(listener1).toHaveBeenCalledWith(payload);
		expect(listener2).toHaveBeenCalledWith(payload);
		expect(listener1).toHaveBeenCalledTimes(1);
		expect(listener2).toHaveBeenCalledTimes(1);
	});

	it('should handle empty listeners array', () => {
		expect(() => dispatch([], 'payload')).not.toThrow();
	});

	it('should handle null/undefined listeners', () => {
		const listener1 = vi.fn();
		const payload = { test: 'data' };

		dispatch([listener1, null, undefined] as any, payload);

		expect(listener1).toHaveBeenCalledWith(payload);
		expect(listener1).toHaveBeenCalledTimes(1);
	});

	it('should handle null listeners array', () => {
		expect(() => dispatch(null as any, 'payload')).not.toThrow();
	});

	it('should handle undefined listeners array', () => {
		expect(() => dispatch(undefined as any, 'payload')).not.toThrow();
	});

	it('should throw errors by default', () => {
		const errorListener = vi.fn(() => {
			throw new Error('Test error');
		});

		expect(() => dispatch([errorListener], 'payload')).toThrow('Test error');
	});

	it('should trap errors when trap=true', () => {
		const errorListener = vi.fn(() => {
			throw new Error('Test error');
		});
		const goodListener = vi.fn();

		expect(() => dispatch([errorListener, goodListener], 'payload', true)).not.toThrow();
		expect(goodListener).toHaveBeenCalledWith('payload');
	});

	it('should call error handler when trap is a function', () => {
		const error = new Error('Test error');
		const errorListener = vi.fn(() => {
			throw error;
		});
		const errorHandler = vi.fn();

		dispatch([errorListener], 'payload', errorHandler);

		expect(errorHandler).toHaveBeenCalledWith(error, 0);
	});

	it('should make a copy of the listeners array to prevent modification', () => {
		const listener1 = vi.fn();
		const listeners = [listener1];

		// Simulate a listener that modifies the array during dispatch
		const modifyingListener = vi.fn(() => {
			listeners.push(vi.fn()); // This should not affect the current dispatch
		});

		listeners.unshift(modifyingListener);

		expect(() => dispatch(listeners, 'payload')).not.toThrow();
		expect(listener1).toHaveBeenCalledWith('payload');
	});
});

describe('dispatch.unsafe', () => {
	it('should call all listeners with the payload', () => {
		const listener1 = vi.fn();
		const listener2 = vi.fn();
		const payload = { test: 'data' };

		dispatch.unsafe([listener1, listener2], payload);

		expect(listener1).toHaveBeenCalledWith(payload);
		expect(listener2).toHaveBeenCalledWith(payload);
	});

	it('should handle null/undefined listeners', () => {
		const listener1 = vi.fn();
		const payload = { test: 'data' };

		dispatch.unsafe([listener1, null, undefined] as any, payload);

		expect(listener1).toHaveBeenCalledWith(payload);
		expect(listener1).toHaveBeenCalledTimes(1);
	});

	it('should handle null listeners array', () => {
		expect(() => dispatch.unsafe(null as any, 'payload')).not.toThrow();
	});

	it('should handle undefined listeners array', () => {
		expect(() => dispatch.unsafe(undefined as any, 'payload')).not.toThrow();
	});

	it('should throw errors by default', () => {
		const errorListener = vi.fn(() => {
			throw new Error('Test error');
		});

		expect(() => dispatch.unsafe([errorListener], 'payload')).toThrow('Test error');
	});

	it('should trap errors when trap=true', () => {
		const errorListener = vi.fn(() => {
			throw new Error('Test error');
		});
		const goodListener = vi.fn();

		expect(() => dispatch.unsafe([errorListener, goodListener], 'payload', true)).not.toThrow();
		expect(goodListener).toHaveBeenCalledWith('payload');
	});
});

describe('dispatch.mapped', () => {
	it('should return results from all listeners', () => {
		const listener1 = vi.fn((x: number) => x * 2);
		const listener2 = vi.fn((x: number) => x + 1);
		const payload = 5;

		const results = dispatch.mapped([listener1, listener2], payload);

		expect(results).toEqual([10, 6]);
		expect(listener1).toHaveBeenCalledWith(payload);
		expect(listener2).toHaveBeenCalledWith(payload);
	});

	it('should handle null/undefined listeners', () => {
		const listener1 = vi.fn((x: number) => x * 2);
		const payload = 5;

		const results = dispatch.mapped([listener1, null, undefined] as any, payload);

		expect(results).toEqual([10, undefined, undefined]);
	});

	it('should return undefined for listeners that throw when trap=true', () => {
		const goodListener = vi.fn((x: number) => x * 2);
		const errorListener = vi.fn(() => {
			throw new Error('Test error');
		});

		const results = dispatch.mapped([goodListener, errorListener], 5, true);

		expect(results).toEqual([10, undefined]);
	});

	it('should call error handler and return undefined when trap is a function', () => {
		const error = new Error('Test error');
		const errorListener = vi.fn(() => {
			throw error;
		});
		const errorHandler = vi.fn();

		const results = dispatch.mapped([errorListener], 'payload', errorHandler);

		expect(results).toEqual([undefined]);
		expect(errorHandler).toHaveBeenCalledWith(error, 0);
	});

	it('should return the same array reference for null listeners', () => {
		const result = dispatch.mapped(null as any, 'payload');
		expect(result).toBeNull();
	});

	it('should handle undefined listeners array', () => {
		const result = dispatch.mapped(undefined as any, 'payload');
		expect(result).toBeUndefined();
	});

	it('should handle empty listeners array', () => {
		const results = dispatch.mapped([], 'payload');
		expect(results).toEqual([]);
	});

	it('should handle listeners array with zero length', () => {
		const emptyArrayLike = { length: 0 };
		const results = dispatch.mapped(emptyArrayLike, 'payload');
		expect(results).toEqual([]);
	});

	it('should throw errors by default in mapped function', () => {
		const errorListener = vi.fn(() => {
			throw new Error('Mapped test error');
		});

		expect(() => dispatch.mapped([errorListener], 'payload')).toThrow('Mapped test error');
	});

	it('should handle mixed successful and null listeners', () => {
		const listener1 = vi.fn((x: string) => x.toUpperCase());
		const listener3 = vi.fn((x: string) => x.toLowerCase());
		
		const results = dispatch.mapped([listener1, null, listener3] as any, 'Hello');
		
		expect(results).toEqual(['HELLO', undefined, 'hello']);
		expect(listener1).toHaveBeenCalledWith('Hello');
		expect(listener3).toHaveBeenCalledWith('Hello');
	});
});