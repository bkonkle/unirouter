import {createAction} from 'redux-actions'
import {INIT_ROUTER, URL_CHANGED} from './index'

export const initRouter = createAction(INIT_ROUTER)

export const urlChanged = createAction(URL_CHANGED)
