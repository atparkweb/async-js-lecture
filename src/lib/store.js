const initialState = {
  coffeeGrinderWorks: true,
  isWaterBoiled: false,
  isCoffeeGround: false,
  isCoffeeBrewed: false
};

class Store {
  constructor() {
    this.state = Object.freeze({ ...initialState });
  }

  breakCoffeeGrinder() {
    this.state = { ...this.state, coffeeGrinderWorks: false };
  }
}

module.exports = Store;