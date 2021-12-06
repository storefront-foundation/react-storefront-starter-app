/**
 * Creates a fetch function with an internal incrementing request counter that ensures that out of order
 * responses result in a `StaleResponseError`.
 *
 * Example usage:
 *
 * ```js
 * import { fetchLatest, StaleResponseError } from 'react-storefront/fetchLatest'
 * import originalFetch from 'fetch'
 *
 * const fetch = fetchLatest(originalFetch)
 *
 * try {
 *   const response = await fetch('/some/url')
 * } catch (e) {
 *   if (!StaleResponseError.is(e)) {
 *     throw e // just ignore stale responses, rethrow all other errors
 *   }
 * }
 * ```
 * @param {Function} fetch An implementation of the standard browser fetch.
 * @return {Function}
 */
export function fetchLatest(fetch) {
  let nextId = 0
  let controller

  const abort = () => {
    controller && controller.abort()

    if (typeof AbortController !== 'undefined') {
      return (controller = new AbortController())
    } else {
      return { signal: null }
    }
  }

  return (url, options) => {
    let id = ++nextId
    const signal = abort().signal

    return fetch(url, { ...options, signal })
      .then(response => {
        if (id !== nextId) {
          throw new StaleResponseError()
        }
        return response
      })
      .catch(error => {
        // For browsers that support AbortController, ensure that the behavior is the same as browsers that don't -
        // StaleResponseError should be thrown in either case
        if (error.name === 'AbortError') {
          throw new StaleResponseError()
        } else {
          throw error
        }
      })
  }
}

/**
 * Thrown when an out of order response is received from `fetchLatest`.
 */
export class StaleResponseError extends Error {
  name = 'StaleResponseError'

  /**
   * Returns true if the specified Error is an instance of StaleResponseError
   */
  static is = e => e.name === 'StaleResponseError'
}
