import * as actions from './actions'

export function getUrl(universal = false, store) {
  if (universal) {
    return store.getState().router.url
  }
  return window.location.pathname + window.location.search
}

export function handlePopState(store) {
  const url = getUrl()
  store.dispatch(actions.urlChanged({url, source: 'popState'}))
}

export default function init(store, routes, aliases) {
  const url = getUrl()
  store.dispatch(actions.initRouter({url, routes, aliases}))
  window.onpopstate = handlePopState
}
