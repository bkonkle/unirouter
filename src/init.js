import {configureRouter} from './router'
import {getUrl} from './utils'
import {navigate} from './actions'

export const handlePopState = store => () => {
  const url = getUrl()
  store.dispatch(navigate({url, push: true, source: 'popState'}))
}

export default function init(store, routes, aliases) {
  const url = getUrl()

  configureRouter(routes, aliases)

  store.dispatch(navigate({url, push: true, source: 'init'}))
  window.onpopstate = handlePopState(store)
}
