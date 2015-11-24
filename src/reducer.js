import {getUrl} from './utils'
import {handleActions} from 'redux-actions'
import {URL_CHANGED, NAVIGATE} from '../src/index'
import router from '../src/router'

export function routeState(url) {
  return {route: router.lookup(url), url}
}

export default handleActions({
  [URL_CHANGED]: (state, action) => {
    return Object.assign({}, state, routeState(action.payload.url))
  },
  [NAVIGATE]: (state, action) => {
    if (getUrl() !== action.payload.url) {
      if (action.payload.silent) {
        history.replaceState({}, null, action.payload.url)
      } else {
        history.pushState({}, null, action.payload.url)
      }

      return Object.assign({}, state, routeState(action.payload.url))
    }
    return state
  },
})
