export function getUrl(universal = false, store) {
  if (universal) {
    return store.getState().router.url
  }
  return window.location.pathname + window.location.search
}
