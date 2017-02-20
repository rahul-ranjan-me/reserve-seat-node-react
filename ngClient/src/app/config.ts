export class Properties {
	token:String;

	public static serverHost = 'http://10.129.11.249:3000/';
	public static inventory = 'http://10.129.11.249:3000/inventories';
	public static bookInventory = 'http://10.129.11.249:3000/inventories';
	public static users = 'http://10.129.11.249:3000/users';
	public static monthOptions = [
		{ value: 'January', label: 'January'},
		{ value: 'February', label: 'February'},
		{ value: 'March', label: 'March'},
		{ value: 'April', label: 'April'},
		{ value: 'May', label: 'May'},
		{ value: 'June', label: 'June'},
		{ value: 'July', label: 'July'},
		{ value: 'August', label: 'August'},
		{ value: 'September', label: 'September'},
		{ value: 'October', label: 'October'},
		{ value: 'November', label: 'November'},
		{ value: 'December', label: 'December'}
	];
	public static genderOptions = [
		{ value: 'Female', label: 'Female'},
		{ value: 'Male', label: 'Male'},
		{ value: 'Other', label: 'Other'}
	];
	public static locationOptions = [
		{ value: 'India', label: 'India'},
		{ value: 'United Kingdom', label: 'United Kingdom'},
		{ value: 'United States', label: 'United States'},
		{ value: 'Singapore', label: 'Singapore'},
		{ value: 'Brazil', label: 'Brazil'},
		{ value: 'Australia', label: 'Australia'},
	];

	public setToken(token){
		this.token = token;
	};

	public getToken(){
		return this.token;
	};

};


let userDetails = {
	setUserDetails: (token) => {
		this.token = token;
	},
	getUserDetails: () => {
		return this.token;
	}
}

export {userDetails};