export function getUrl(store) {
  if (typeof window !== 'undefined' && window.location) {
    return window.location.pathname + window.location.search
  }
  return store.getState().router.url
}
