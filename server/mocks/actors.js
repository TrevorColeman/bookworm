/* jshint node:true */
module.exports = function (app) {
	var express = require('express');
	var actorsRouter = express.Router();

	var actors = [{
		id: 1,
		name: 'Drew Barrymore',
		sex: 'f',
		movie: 2
  }, {
		id: 2,
		name: 'Will Ferrel',
		sex: 'm',
		movie: 4
  }, {
		id: 3,
		name: 'Paul Rudd',
		sex: 'm',
		movie: 4
  }, {
		id: 4,
		name: 'Joseph Cotten',
		sex: 'm',
		movie: 3
  }, {
		id: 5,
		name: 'Jack Nicholson',
		sex: 'm',
		movie: 1
  }, {
		id: 6,
		name: 'Shelly Duvall',
		sex: 'f',
		movie: 1
  }, {
		id: 7,
		name: 'John Turkell',
		sex: 'm',
		movie: 1
  }];

	actorsRouter.get('/', function (req, res) {
		var data = [];

		actors.forEach(function (item) {
			data.push({
				type: 'actors',
				id: item.id.toString(),
				attributes: {
					name: item.name,
					sex: item.sex,
					movie: item.movie
				},
				relationships: {
					data: {
						movies: {
							type: 'movies',
							id: item.movie
						}
					}
				}
			});
		});
		res.set('Content-Type', 'application/vnd.api+json');
		res.send({
			data: data
		});
	});

	actorsRouter.post('/', function (req, res) {
		var newActor = req.body.data.attributes;
		var newId = actors.length + 1;
		newActor.id = newId;

		actors.push({
			name: newActor.name,
			sex: newActor.sex,
			movie: newActor.movie,
			id: newId
		});

		res.set('Content-Type', 'application/vnd.api+json');
		res.send({
			data: {
				type: 'actors',
				id: newId,
				attributes: newActor
			}
		});
	});

	actorsRouter.get('/:id', function (req, res) {
		var data = {};
		actors.forEach(function (item) {
			if (item.id === parseInt(req.params.id, 10)) {
				data = {
					type: 'actors',
					id: item.id.toString(),
					attributes: {
						name: item.name,
						sex: item.sex,
						movie: item.movie
					}
				};
			}
		});
		res.set('Content-Type', 'application/vnd.api+json');
		res.send({
			data: data
		});
	});

	actorsRouter.patch('/:id', function (req, res) {
		var actorAttrs = req.body.data.attributes;
		var actorId = req.params.id;
		console.log('actorId', actorId);
		actors.forEach(function (item) {
			if (item.id === parseInt(actorId, 10)) {
				item.name = actorAttrs.name;
				item.sex = actorAttrs.sex;
				item.movie = actorAttrs.movie;
			}
		});
		res.send({
			data: {
				type: 'actors',
				id: actorId,
				attributes: actorAttrs
			}
		});
	});

	actorsRouter.put('/:id', function (req, res) {
		res.send({
			'actors': {
				id: req.params.id
			}
		});
	});

	actorsRouter.delete('/:id', function (req, res) {
		var actorId = req.params.id;
		for (var i = 0; i < actors.length; i++) {
			if (parseInt(actorId, 10) === actors[i].id) {
				actors.splice(i, 1);
				break;
			}
		}
		res.status(204).end();
	});

	// The POST and PUT call will not contain a request body
	// because the body-parser is not included by default.
	// To use req.body, run:

	//    npm install --save-dev body-parser

	// After installing, you need to `use` the body-parser for
	// this mock uncommenting the following line:
	//
	// app.use('/api/actors', require('body-parser'));
	app.use('/api/actors', actorsRouter);
};
