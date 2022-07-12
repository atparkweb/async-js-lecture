const logger = require('./lib/logger');
const state = require('./state');

function boilWater() {
  const time = 2000; // 2 seconds

  return new Promise((resolve, reject) => {
    if (state.isWaterBoiled) {
      reject(false);
    }

    // Promise is PENDING
    logger.pending("Step 1: Boil water");

    setTimeout(() => {
      logger.success("Done boiling");
      resolve(true); // Promise is RESOLVED
    }, time);
  });
}

function grind() {
  const time = 2000; // 2 seconds

  return new Promise((resolve, reject) => {
    if (state.isCoffeeGround) {
      reject(false);
    }

    // Promise is PENDING
    logger.pending("Step 2: Grind coffee");

    if (state.coffeeGrinderWorks) {
      setTimeout(() => {
        logger.success("Ground coffee");
        resolve(true); // Promise is RESOLVED
      }, time);
    } else {
      reject(false); // Promise is REJECTED
    }
  });
}

function brew(groundCoffee) {
  const time = 4000; // 4 seconds

  return new Promise((resolve, reject) => {
    logger.pending("Step 3: Brew coffee");

    // Promise is PENDING
    setTimeout(() => {
      logger.success(`Brewed coffee with ${groundCoffee}`);
      resolve(true); // Promise is RESOLVED
    }, time); // resolve after 2 seconds
  });
}

function drink(coffee) {
  logger.success(`Step 4: Drinking ${coffee}. Delicious!`);
}

function makeCoffeeWithPromise() {
  boilWater()
    .then(result => {
      state.isWaterBoiled = result;
      return grind();
    })
    .then(result => {
      state.isCoffeeGround = result;
      return brew();
    })
    .then(result => {
      state.isCoffeeBrewed = result;
      return drink();
    })
    .catch(error => {
      logger.error(error);
    });
}

makeCoffeeWithPromise();
