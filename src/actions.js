import {createAction} from 'redux-actions'
import {NAVIGATE} from './constants'

const history = typeof window !== 'undefined' && window.history

export const navigate = createAction(NAVIGATE, payload => {
  if (history && payload.source !== 'popState') {
    if (payload.push) {
      history.pushState({}, null, payload.url)
    } else if (payload.replace) {
      history.replaceState({}, null, payload.url)
    }
  }
  return payload
})
