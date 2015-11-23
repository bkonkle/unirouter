import {URL_CHANGED} from '../src/index'
import handleActions from 'redux-actions'

export default handleActions({
  [URL_CHANGED]: (state, action) => {
    return {state, action}
  },
})
