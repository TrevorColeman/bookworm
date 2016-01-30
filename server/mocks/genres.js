module.exports = function (app) {
	var express = require('express');
	var genresRouter = express.Router();

	var genres = [
		{
			id: 1,
			name: 'Comedy',
			movies: [1, 4]
  },
		{
			id: 2,
			name: 'Action',
			movies: [2, 4]
  },
		{
			id: 3,
			name: 'Drama',
			movies: [1, 2, 3, 4]
  }];

	genresRouter.get('/', function (req, res) {
		var data = [];
		genres.forEach(function (item) {
			var moviesRelations = [];
			for (var i = 0; i < item.movies.length; i++) {
				moviesRelations.push({
					type: 'movies',
					id: item.movies[i]
				});
			}
			data.push({
				type: 'genres',
				id: item.id,
				attributes: {
					name: item.name
				},
				relationships: {
					movies: {
						data: moviesRelations
					}
				}
			});
		});

		console.log(data);

		res.set('Content-Type', 'application/vnd.api+json');
		res.send({
			data: data
		});
	});

	genresRouter.post('/', function (req, res) {
		var newGenre = req.body.data.attributes;
		var newId = genres.length + 1;
		newGenre.id = newId;

		genres.push({
			title: newGenre.title,
			director: newGenre.director,
			id: newId
		});

		res.set('Content-Type', 'application/vnd.api+json');
		res.send({
			data: {
				type: 'genres',
				id: newId,
				attributes: newGenre
			}
		});
	});

	genresRouter.get('/:id', function (req, res) {
		var data = [];
		genres.forEach(function (item) {
			console.log(item, item.id, req.params.id);

			if (item.id === parseInt(req.params.id, 10)) {
				var moviesRelations = [];
				for (var i = 0; i < item.movies.length; i++) {
					moviesRelations.push({
						type: 'movies',
						id: item.movies[i]
					});
				}

				data.push({
					type: 'genres',
					id: item.id.toString(),
					attributes: {
						name: item.name
					},
					relationships: {
						movies: {
							data: moviesRelations
						}
					}
				});

				console.log('GENRES BY ID: \n', data);

				res.set('Content-Type', 'application/vnd.api+json');
				res.send({
					data: data
				});
			}
		});
	});

	genresRouter.patch('/:id', function (req, res) {
		var genreAttrs = req.body.data.attributes;
		var genreId = req.params.id;
		console.log('genreId', genreId);
		genres.forEach(function (item) {
			if (item.id === parseInt(genreId, 10)) {
				item.name = genreAttrs.name;
			}
		});
		res.send({
			data: {
				type: 'genres',
				id: genreId,
				attributes: genreAttrs
			}
		});
	});

	genresRouter.put('/:id', function (req, res) {
		res.send({
			'genres': {
				id: req.params.id
			}
		});
	});

	genresRouter.delete('/:id', function (req, res) {
		var genreId = req.params.id;
		for (var i = 0; i < genres.length; i++) {
			if (parseInt(genreId, 10) === genres[i].id) {
				genres.splice(i, 1);
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
	// app.use('/api/genres', require('body-parser'));
	app.use('/api/genres', genresRouter);
};
