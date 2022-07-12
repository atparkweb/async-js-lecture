const logger = require('./lib/logger');
const state = require('./state');

function boilWater(onComplete) {
  const time = 2000; // 2 seconds

  logger.pending("Step 1: Boil water");
  setTimeout(() => {
    logger.success("Done boiling");
    onComplete();
    state.isWaterBoiled = true;
  }, time);
}

function grindCoffee(onComplete) {
  logger.pending("Step 2: Grind coffee");

  if (state.coffeeGrinderWorks) {
    const time = 1000; // 1 second

    setTimeout(() => {
      logger.success("Ground coffee");
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

  logger.pending("Step 3: Brew coffee");

  setTimeout(() => {
    logger.success("Brewed with ground coffee");
    onComplete();
    state.isCoffeeBrewed = true;
  }, time);
}

function drinkCoffee() {
  logger.success("Step 4: Drinking coffee. Delicious!");
}

function start() {
  /*
  * This is callback hell.
  * Nested callbacks control the order of async code, but it's ugly.
  * Handling errors is kind of a mess.
  */
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
  logger.error(err.message);
}

start();
