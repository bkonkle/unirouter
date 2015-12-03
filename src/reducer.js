import {handleActions} from 'redux-actions'
import {NAVIGATE} from './constants'
import getRouter from './router'

export function routeState(url) {
  return {route: getRouter().lookup(url), url}
}

export default handleActions({
  [NAVIGATE]: (state, action) => {
    if (action.payload.push) {
      history.pushState({}, null, action.payload.url)
    } else if (action.payload.replace) {
      history.replaceState({}, null, action.payload.url)
    }

    return Object.assign({}, state, routeState(action.payload.url))
  },
})
