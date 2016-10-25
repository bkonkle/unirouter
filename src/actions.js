import {createAction} from 'redux-actions'
import {NAVIGATE} from './constants'

export const navigate = createAction(NAVIGATE, payload => {
  if (typeof window.history !== 'undefined' && payload.source !== 'popState') {
    if (payload.push) {
      window.history.pushState({}, null, payload.url)
    } else if (payload.replace) {
      window.history.replaceState({}, null, payload.url)
    }
  }
  return payload
})
