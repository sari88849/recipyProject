import { applyMiddleware, combineReducers, createStore } from 'redux'
import UserReducer from './Reducer/UserReducer'
import { reducer as formReducer } from 'redux-form'
import { project } from './Middelwars/Curd'
// import thunk from 'redux-thunk'

const reducer = combineReducers({ UserReducer, form: formReducer })

const store = createStore(reducer, applyMiddleware(project))
window.store = store;
export default store