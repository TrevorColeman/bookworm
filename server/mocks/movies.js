module.exports = function (app) {
	var express = require('express');
	var moviesRouter = express.Router();

	var movies = [
		{
			id: 1,
			title: 'The Shining',
			director: 'Stanley Kubrick',
			actors: [5, 6, 7],
			genres: [1, 3]
  },
		{
			id: 2,
			title: 'ET',
			director: 'Steven Spielberg',
			actors: [1],
			genres: [2, 3]
  },
		{
			id: 3,
			title: 'Citizen Kane',
			director: 'Orson Wells',
			actors: [4],
			genres: [3]
			},
		{
			id: 4,
			title: 'Anchorman',
			director: 'Adam McKay',
			actors: [2, 3],
			genres: [1]
  }];

	moviesRouter.get('/', function (req, res) {
		var data = [];
		movies.forEach(function (item) {
			var actorRelations = [];
			for (var i = 0; i < item.actors.length; i++) {
				actorRelations.push({
					type: 'actors',
					id: item.actors[i]
				});
			}

			var genreRelations = [];
			for (i = 0; i < item.genres.length; i++) {
				genreRelations.push({
					type: 'genres',
					id: item.genres[i]
				});
			}

			data.push({
				type: 'movies',
				id: item.id,
				attributes: {
					title: item.title,
					director: item.director
				},
				relationships: {
					actors: {
						data: actorRelations
					},
					genres: {
						data: genreRelations
					}
				}
			});
		});
		res.set('Content-Type', 'application/vnd.api+json');
		res.send({
			data: data
		});
	});

	moviesRouter.post('/', function (req, res) {
		var newMovie = req.body.data.attributes;
		var newId = movies.length + 1;
		newMovie.id = newId;

		movies.push({
			title: newMovie.title,
			director: newMovie.director,
			id: newId
		});

		res.set('Content-Type', 'application/vnd.api+json');
		res.send({
			data: {
				type: 'movies',
				id: newId,
				attributes: newMovie
			}
		});
	});

	moviesRouter.get('/:id', function (req, res) {
		var data = [];
		movies.forEach(function (item) {
			if (item.id === parseInt(req.params.id, 10)) {
				var actorRelations = [];
				for (var i = 0; i < item.actors.length; i++) {
					actorRelations.push({
						type: 'actors',
						id: item.actors[i]
					});
				}

				var genreRelations = [];
				for (i = 0; i < item.genres.length; i++) {
					genreRelations.push({
						type: 'genres',
						id: item.genres[i]
					});
				}

				data = {
					type: 'movies',
					id: item.id,
					attributes: {
						title: item.title,
						director: item.director
					},
					relationships: {
						actors: {
							data: actorRelations
						},
						genres: {
							data: genreRelations
						}
					}
				};
			}
		});
		res.set('Content-Type', 'application/vnd.api+json');
		res.send({
			data: data
		});
	});

	moviesRouter.patch('/:id', function (req, res) {
		var movieAttrs = req.body.data.attributes;
		var movieId = req.params.id;
		console.log('movieId', movieId);
		movies.forEach(function (item) {
			if (item.id === parseInt(movieId, 10)) {
				item.title = movieAttrs.title;
				item.director = movieAttrs.director;
			}
		});
		res.send({
			data: {
				type: 'movies',
				id: movieId,
				attributes: movieAttrs
			}
		});
	});

	moviesRouter.put('/:id', function (req, res) {
		res.send({
			'movies': {
				id: req.params.id
			}
		});
	});

	moviesRouter.delete('/:id', function (req, res) {
		var movieId = req.params.id;
		for (var i = 0; i < movies.length; i++) {
			if (parseInt(movieId, 10) === movies[i].id) {
				movies.splice(i, 1);
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
	// app.use('/api/movies', require('body-parser'));
	app.use('/api/movies', moviesRouter);
};
