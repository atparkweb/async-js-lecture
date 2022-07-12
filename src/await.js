const logger = require('./lib/logger');
const state = require('./state');

function boilWater() {
  const time = 2000; // 2 seconds

  return new Promise((resolve, reject) => {
    // Promise is PENDING
    logger.pending("Step 1: Boil water");

    setTimeout(() => {
      logger.success("Done boiling");
      resolve(true); // Promise is RESOLVED
    }, time);
  });
}

function grindCoffee() {
  const time = 2000; // 2 seconds

  return new Promise((resolve, reject) => {
    // Promise is PENDING
    logger.pending("Step 2: Grind coffee");

    if (state.coffeeGrinderWorks) {
      setTimeout(() => {
        logger.success("Ground coffee");
        resolve(true); // Promise is RESOLVED
      }, time); // resolve after 2 seconds
    } else {
      reject(false); // Promise is REJECTED
    }
  });
}

function brewCoffee(groundCoffee) {
  const time = 4000; // 4 seconds

  return new Promise((resolve, reject) => {
    // Promise is PENDING
    logger.pending("Step 3: Brew coffee");

    setTimeout(() => {
      logger.success(`Brewed coffee with ${groundCoffee}`);
      resolve(true); // Promise is RESOLVED
    }, time);
  });
}

function drinkCoffee(coffee) {
  logger.success(`Step 4: Drinking ${coffee}. Delicious!`);
}

/**
 * This version uses async/await to make async code look synchronous
 */
async function start() {
  try {
    const boilResult = await boilWater();
    state.isWaterBoiled = boilResult;
    const grindResult = await grindCoffee();
    state.isCoffeeGround = grindResult;
    const brewResult = await brewCoffee();
    state.isCoffeeBrewed = brewResult;
    drinkCoffee();
  } catch(error) {
    logger.error(error);
  }
}

start();
