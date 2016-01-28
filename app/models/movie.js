import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  director: DS.attr(),
  actors: DS.hasMany('actor', {async: true})
});
