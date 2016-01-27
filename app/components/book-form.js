import Ember from 'ember';

export default Ember.Component.extend({
  buttonLabel:  function () {
    return (this.get('book').id) ? 'Update Book' : 'Add Book';
  }.property(),
  
  actions: {
    submit () {
      this.sendAction('action', this.get('book'));
    },
    jangle () {
      console.log("OH SHIT!!! YOU CLICKED DANGER");
    }
  }
});
