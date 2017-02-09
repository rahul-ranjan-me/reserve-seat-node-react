export const selectSeats = (seat) => {
	return {
		type: 'SEAT_SELECTED',
		payload : seat
	}
};

export const removeSeats = (seat) => {
	return {
		type: 'SEAT_REMOVED',
		payload : seat
	}
};

export const removeAllSeats = (seats) => {
	return {
		type: 'SEATS_REMOVED',
		payload : seats
	}
};

export const inventoryGET = (inventory) => {
	return {
		type: 'INVENTORY_GET',
		payload : inventory
	}
};

export const inventoryPOST = (inventory) => {
	return {
		type: 'INVENTORY_POST',
		payload : inventory
	}
};

export const inventoryPUT = (inventory) => {
	return {
		type: 'INVENTORY_PUT',
		payload : inventory
	}
};

export const inventoryDELETE = (inventory) => {
	return {
		type: 'INVENTORY_DELETE',
		payload : inventory
	}
};

export const inventoryDELETEALL = () => {
	return {
		type: 'INVENTORY_DELETEALL'
	}
};

export const selectInventory = (inventory) => {
	return {
		type: 'INVENTORY_SELECTED',
		payload : inventory
	}
};

export const clearSelectionInventory = (inventory) => {
	return {
		type: 'CLEAR_SELECTION',
		payload : inventory
	}
};

export const updateInventory = (inventories) => {
	return {
		type: 'INVENTORY_UPDATE',
		payload : inventories
	}
};
