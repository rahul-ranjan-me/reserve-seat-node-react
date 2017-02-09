var express = require('express'),
	bodyParser = require('body-parser'),
	inventoryRouter = express.Router(),
	fileUpload = require('express-fileupload'),
	xls = require('excel'),
	mongoose = require('mongoose'),
	Inventories = require('../models/inventories'),
	Verify = require('./verify');

inventoryRouter.use(bodyParser.json());
inventoryRouter.use(fileUpload());


inventoryRouter.route('/')
	.get(Verify.verifyOrdinaryUser, (req, res, next) => {
		
		Inventories.find({}, (err, inventory) => {
			if(err) throw err;
			res.json(inventory);
		});

	})
	.post(Verify.verifyOrdinaryUser, (req, res, next) => {
		Inventories.create(req.body, (err, inventory) => {
			if(err) throw err;
			var id = inventory._id;
			Inventories.find({}, (err, inventory) => {
				if(err) throw err;
				res.json(inventory);
			});
		});

	})
	.put(Verify.verifyOrdinaryUser, (req, res, next) => {
		req.body.ids.map( (id) => {
			Inventories.findByIdAndUpdate(id, { $set:
				{
					isAvailable : false,
					bookedBy : req.body.bookedBy,
					bookedByUserId : req.body.bookedByUserId,
					bookedFrom : req.body.bookedFrom,
					bookedOn : req.body.bookedOn,
					bookedTill : req.body.bookedTill
				}
			},
			{
				new:true
			}, (err, inventory) => {
				if(err) throw err;
			});
		});

		Inventories.find({}, (err, inventory) => {
			if(err) throw err;
			res.json(inventory);
		});
	})
	.delete(Verify.verifyOrdinaryUser, (req, res, next) => {
		Inventories.remove({}, (err, resp) => {
			if(err) throw err;
			res.json(resp);
		});
	});

inventoryRouter.route('/:inventoryId')
	.get(Verify.verifyOrdinaryUser, (req, res, next) => {
		Inventories.findById(req.params.inventoryId, (err, inventory) => {
			if(err) throw err;
			res.json(inventory);
		});
	})
	.put(Verify.verifyOrdinaryUser, (req, res, next) => {
		Inventories.findByIdAndUpdate(req.params.inventoryId, {$set: req.body}, {
			new:true
		}, (err, inventory) => {
			if(err) throw err;
			res.json(inventory);
		});
	})
	.delete(Verify.verifyOrdinaryUser, (req, res, next) => {
		Inventories.findByIdAndRemove(req.params.inventoryId, (err, resp) => {
			if(err) throw err;
			Inventories.find({}, (err, inventory) => {
				if(err) throw err;
				res.json(inventory);
			});
		});
	});

inventoryRouter.route('/user/:userId')
	.get(Verify.verifyOrdinaryUser, (req, res, next) => {
		Inventories.find({'bookedByUserId': req.params.userId}, (err, inventory) => {
			if(err) throw err;
			res.json(inventory);
		});
	})

inventoryRouter.route('/user/:userId/:inventoryId')
	.put(Verify.verifyOrdinaryUser, (req, res, next) => {
		Inventories.findByIdAndUpdate(req.params.inventoryId, {$set: {
			bookedFrom : req.body.bookedFrom,
			bookedTill : req.body.bookedTill
		}}, {
			new:true
		}, (err, inventory) => {
			if(err) throw err;
			res.json(inventory);
		});
	})
	.delete(Verify.verifyOrdinaryUser, (req, res, next) => {
		Inventories.findByIdAndUpdate(req.params.inventoryId, {$set:
			{
				isAvailable : true,
				bookedBy : null,
				bookedByUserId : null,
				bookedFrom : null,
				bookedOn : null,
				bookedTill : null
			}
		}, {
			new:true
		}, (err, inventory) => {
			if(err) throw err;
			Inventories.find({'bookedByUserId': req.params.userId}, (err, inventory) => {
				if(err) throw err;
				res.json(inventory);
			});
		});
	});

inventoryRouter.route('/bulkUpload')
	.post(Verify.verifyOrdinaryUser, (req, res, next) => {
		var bulkUploadFile = req.files.bulkUploadFile;
		bulkUploadFile.mv(config.bulkUploadURL+bulkUploadFile.name, function(err) {
			if (err) {
				res.status(500).send(err);
			}else {
				
				xls(config.bulkUploadURL+bulkUploadFile.name, function(err, sheet) {
				    if(err) throw err;

				    var sheetLength = sheet.length,
				    	recordToSend = [];

				    sheet.map( (row) => {
				    	row[1] = row[1] == '1' ? true : false;
				    	row[2] = row[2] == '1' ? true : false;
				    	var record = {
				    		details: {
				    			desktopDetails: {
				    				isHeadPhoneAvailable: row[1],
				    				isWebCamAvailable: row[2],
				    				seat: row[3]
				    			}
				    		},
				    		location: row[0],
				    		type: row[4]
				    	};

				    	recordToSend.push(record);
				    });

				    Inventories.collection.insert(recordToSend, (err, docs) => {
				    	if(err) throw err;
					    
						Inventories.find({}, (err, inventory) => {
							if(err) throw err;
							res.json(inventory);
						});
					    
				    });
				});
				
			}
		});

		
	});


module.exports = inventoryRouter;