import * as actions from './actions'
import curry from 'curry'

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

export default function init(store) {
  const url = getUrl()
  store.dispatch(actions.urlChanged({url, source: 'init'}))
  window.onpopstate = curry(handlePopState)(store)
}
