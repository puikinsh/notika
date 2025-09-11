export type KnownPolyfill = typeof knownPolyfills[number]

/** Incomplete list of APIs provided by Polyfill.io */
export const knownPolyfills = [
  'AbortController',
  'AudioContext',
  'CSS.supports',
  'IntersectionObserver',
  'Intl',
  'MutationObserver',
  'Reflect',
  'ResizeObserver',
  'fetch',
  'globalThis',
  'queueMicrotask',
  'requestIdleCallback',
] as const
