import { composeWithDevTools } from 'redux-devtools-extension';

import {createStore,combineReducers} from 'redux';
import {applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import { userReducer } from './reducers/userReducer';
import { classReducer } from './reducers/classReduer';



const rootReducer = combineReducers({
   user:userReducer,
   classes:classReducer
})



export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(reduxThunk)));