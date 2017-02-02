var express = require('express'),
	bodyParser = require('body-parser'),
	inventoryRouter = express.Router(),
	mongoose = require('mongoose'),
	Inventories = require('../models/inventories'),
	Verify = require('./verify');

inventoryRouter.use(bodyParser.json());

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

module.exports = inventoryRouter;