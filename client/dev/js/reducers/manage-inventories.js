import _ from 'lodash';

export default function (state = [], action){

	switch(action.type){
		case 'INVENTORY_GET' : 
			return action.payload;

		case 'INVENTORY_POST' : 
			// let newInventory = _.cloneDeep(state);
			// newInventory.push(action.payload);			
			// return newInventory;
			return action.payload;

		case 'INVENTORY_PUT' :
			let updatedInventory = _.cloneDeep(state),
				indexOfUpdatedInventory = _.findIndex(updatedInventory, {'_id': action.payload._id});
			if(indexOfUpdatedInventory !== -1){
				updatedInventory[indexOfUpdatedInventory] = action.payload;
			}

			return updatedInventory;

		case 'INVENTORY_DELETE' :
			let toDeleteInventory = _.cloneDeep(state),
				indexOfDeletedInventory = _.findIndex(updatedInventory, {'id': action.payload._id});
			
			if(indexOfDeletedInventory !== -1){
				toDeleteInventory.splice(indexOfDeletedInventory, 1);
			}

			return toDeleteInventory;
		case 'INVENTORY_DELETEALL' :
			return [];
		case 'INVENTORY_UPDATE' :
			let toUpdateInventory = _.cloneDeep(state);
			action.payload.map( (obj, key) => {
				let toUpdateIndex = _.findIndex(toUpdateInventory, {'_id': obj._id})
				toUpdateInventory[toUpdateIndex].isAvailable = false;
			});

			return toUpdateInventory;
		break;
	}

	return state
}