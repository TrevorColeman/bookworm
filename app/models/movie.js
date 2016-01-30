import DS from 'ember-data';

export default DS.Model.extend({
	title: DS.attr(),
	director: DS.attr(),
	genres: DS.hasMany('genre', {
		async: true
	}),
	actors: DS.hasMany('actor', {
		async: true
	})
});
