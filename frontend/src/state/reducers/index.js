// REDUX
import { combineReducers }                  from 'redux';

//REDUCERS
import markerListReducer                    from './marker';


const reducer = combineReducers({
    markerList: markerListReducer
});

export default reducer;