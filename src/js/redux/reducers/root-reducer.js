import { combineReducers } from 'redux';
import riskLevelReducer from './riskLevel.reducer.jsx';

export default combineReducers({
  riskLevels: riskLevelReducer
})