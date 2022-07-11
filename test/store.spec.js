const Store = require('../src/lib/store');
const { expect } = require('chai');

describe('Store', function() {
  let store;

  before(function() {
    store = new Store();
  });

  describe('coffeeGrinderWorks', function() {
    it('should break via method', function() {
      expect(store.state.coffeeGrinderWorks).to.eq(true);
      store.breakCoffeeGrinder();
      expect(store.state.coffeeGrinderWorks).to.eq(false);
    });
  });
});