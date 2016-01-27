import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return {title: '', author: '', description: ''};
  },
  setupController (controller, model) {
      controller.set('book', model);
  },
});
