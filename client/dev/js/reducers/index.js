import {combineReducers} from 'redux';
import AvailableSeats from './reducer-available-seats';
import chosenSeats from './chosen-seats';
import inventories from './manage-inventories';
import chosenInventory from './chosen-inventory';

const allReducers = combineReducers({
	availableSeats: AvailableSeats,
	chosenSeats : chosenSeats,
	inventories : inventories,
	chosenInventory : chosenInventory
});

export default allReducers;