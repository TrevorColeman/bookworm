import Ember from 'ember';

export default Ember.Route.extend({
	model: function () {

		console.log(this.store.findAll('movie'));

		return Ember.RSVP.hash({
			movies: this.store.findAll('movie'),
			actors: this.store.findAll('actor')
		});
	},
	setupController (controller, models) {
		return controller.setProperties(models);
	},
	actions: {
		deleteBook: function (book) {
			// var _this = this;
			book.destroyRecord();
		}
	}
});
