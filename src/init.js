import {configureRouter} from './router'
import {getUrl} from './utils'
import {navigate} from './actions'

export const handlePopState = store => () => {
  const url = getUrl(store)
  store.dispatch(navigate({url, push: true, source: 'popState'}))
}

export default function init(store, routes, aliases) {
  const url = getUrl(store)

  configureRouter(routes, aliases)

  store.dispatch(navigate({url, source: 'init'}))

  if (typeof window !== 'undefined') {
    window.onpopstate = handlePopState(store)
  }
}
