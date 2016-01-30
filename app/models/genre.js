import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr(),
	movies: DS.hasMany('movie', {
		async: true
	})
});
