import { composeWithDevTools } from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import {createStore,combineReducers} from 'redux';
import {applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
   
})

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(reduxThunk)));