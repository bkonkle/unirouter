import {configureRouter} from './router'
import {getUrl} from './utils'
import {urlChanged} from './actions'

export const handlePopState = store => () => {
  const url = getUrl()
  store.dispatch(urlChanged({url, source: 'popState'}))
}

export default function init(store, routes, aliases) {
  const url = getUrl()

  configureRouter(routes, aliases)

  store.dispatch(urlChanged({url, source: 'init'}))
  window.onpopstate = handlePopState(store)
}
