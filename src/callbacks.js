const logger = require('./lib/logger');
const { WAIT, OK, ERROR } = logger.statuses

const Store = require('./lib/store');
const state = new Store();

function boilWater(onComplete) {
  const time = 2000; // 2 seconds

  logger.log("Step 1: Boil water", WAIT);
  setTimeout(() => {
    // this will run after 2 seconds
    logger.log("Done boiling", OK);
    onComplete();
    //state.isWaterBoiled = true;
  }, time);
}

function grindCoffee(onComplete) {
  logger.log("Step 2: Grind coffee", WAIT);

  if (state.coffeeGrinderWorks) {
    const time = 1000; // 1 second

    setTimeout(() => {
      // This will run after 1 second
      logger.log("Ground coffee", OK);
      onComplete();
      state.isCoffeeGround = true;
    }, time);
  } else {
    throw new Error("Coffee grinder is broken!");
  }
}

function brewCoffee(onComplete) {
  if (!state.isCoffeeGround && !state.isWaterBoiled) {
    throw new Error("Can't brew coffee without grounds and hot water.")
  }

  const time = 4000; // 4 seconds

  logger.log("Step 3: Brew coffee", WAIT);

  setTimeout(() => {
    // This will run after 4 seconds
    logger.log("Brewed with ground coffee", OK);
    onComplete();
    state.isCoffeeBrewed = true;
  }, time);
}

function drinkCoffee() {
  logger.log("Step 4: Drinking coffee. Delicious!", OK);
}


/**
 * This is callback hell. 
 * Nested callbacks control the order of async code, but it's ugly.
 * Handling errors is kind of a mess
 */
 function start() {
    boilWater(() => {
      try {
        grindCoffee(() => {
          try {
            brewCoffee(() => {
              try {
                drinkCoffee();
              } catch (err) {
                handleError(err);
              }
            });
          } catch (err) {
            handleError(err);
          }
        });
      } catch (err) {
        handleError(err);
      }
    });
}

function handleError(err) {
  logger.log(err.message, ERROR);
}

start();
