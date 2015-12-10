import {createAction} from 'redux-actions'
import {NAVIGATE} from './constants'

export const navigate = createAction(NAVIGATE, payload => {
  if (typeof history !== 'undefined') {
    if (payload.push) {
      history.pushState({}, null, payload.url)
    } else if (payload.replace) {
      history.replaceState({}, null, payload.url)
    }
  }
  return payload
})
