import _ from 'lodash';

export default function (state = {}, action){

	switch(action.type){
		case 'INVENTORY_SELECTED' : 
			let newState = Object.assign({}, state);
			
			return newState = (newState._id === action.payload._id) ? {} : action.payload;

		case 'CLEAR_SELECTION' : 
			return {};

		break;
	}

	return state
}