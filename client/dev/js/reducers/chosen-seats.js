import _ from 'lodash';

export default function (state = [], action){

	switch(action.type){
		case 'SEAT_SELECTED' : 
			let newState = _.cloneDeep(state);
			if(newState.length && _.findIndex(newState, {'_id': action.payload._id}) !== -1){
				newState.splice(_.findIndex(newState, {'_id': action.payload._id}), 1);
			}else{
				newState.push(action.payload)
			}

			return newState;

		case 'SEAT_REMOVED' :
			let newStateForRemove = _.cloneDeep(state);

			if(newStateForRemove.length && _.findIndex(newStateForRemove, {'_id': action.payload._id}) !== -1){
				newStateForRemove.splice(_.findIndex(newStateForRemove, {'_id': action.payload._id}), 1);
			}

			return newStateForRemove;

		case 'SEATS_REMOVED' :
			return [];


		break;
	}

	return state
}