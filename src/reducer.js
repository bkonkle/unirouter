import {handleActions} from 'redux-actions'
import {NAVIGATE} from './constants'
import getRouter from './router'

const initialState = {
  url: null,
  route: null,
}

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
    return {...state, ...routeState(action.payload.url)}
  },
}, initialState)
