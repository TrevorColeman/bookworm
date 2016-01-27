import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {

    console.log(this.store.findAll('book'));

    return Ember.RSVP.hash({
      books: this.store.findAll('book'),
      things: this.store.findAll('thing'),
    });
  },
  setupController(controller, models) {
    return controller.setProperties(models);
  },
  actions: {
    deleteBook: function(book) {
      // var _this = this;
      book.destroyRecord();
    }
  }
});
