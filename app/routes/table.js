import Ember from 'ember';

export default Ember.Route.extend({
	model: function () {
		return Ember.RSVP.hash({
			genres: this.store.findAll('genre')
		});
	},
	setupController (controller, models) {
		return controller.setProperties(models);
	}
});
