import {createAction} from 'redux-actions'
import {URL_CHANGED, NAVIGATE} from './index'

export const urlChanged = createAction(URL_CHANGED)
export const navigate = createAction(NAVIGATE)
