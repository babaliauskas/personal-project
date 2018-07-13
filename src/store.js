import { createStore } from 'redux';
import reducer from './duck/reducer';

let store = createStore(reducer) 
export default store;