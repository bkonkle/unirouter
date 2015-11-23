import * as actions from './actions'
import curry from 'curry'

export function getUrl(universal = false, store) {
  if (universal) {
    return store.getState().router.url
  }
  return window.location.pathname + window.location.search
}

export function handleUnload(store, event) {
  const state = store.getState()
  const message = state.router.preventNavigationMessage
  if (state.router.preventNavigation && message && message.length > 0) {
    event.returnValue = message
    return message
  }
}

export function handlePopState(store) {
  const url = getUrl()
  store.dispatch(actions.urlChanged({url, source: 'popState'}))
}

export default function init(store) {
  const url = getUrl()
  store.dispatch(actions.urlChanged({url, source: 'init'}))

  window.onbeforeunload = curry(handleUnload)(store)
  window.onpopstate = curry(handlePopState)(store)
}
