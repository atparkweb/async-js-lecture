const logger = require('./logger');
const state = require('./state');

const boilTime = 2000;  // 2 seconds
const grindTime = 1000; // 1 second
const brewTime = 4000;  // 4 seconds

function boilWater(onComplete, time) {
  logger.pending("Step 1: Boil water");

  setTimeout(() => {
    logger.success("Done boiling");
    onComplete();
    state.isWaterBoiled = true;
  }, time);
}
function boilWaterPromise(time) {
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


function grindCoffee(onComplete, time) {
  logger.pending("Step 2: Grind coffee");

  if (state.coffeeGrinderWorks) {
    setTimeout(() => {
      logger.success("Ground coffee");
      onComplete();
      state.isCoffeeGround = true;
    }, time);
  } else {
    throw new Error("Coffee grinder is broken!");
  }
}
function grindCoffeePromise(time) {
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


function brewCoffee(onComplete, time) {
  if (!state.isCoffeeGround && !state.isWaterBoiled) {
    throw new Error("Can't brew coffee without grounds and hot water.")
  }

  logger.pending("Step 3: Brew coffee");

  setTimeout(() => {
    logger.success("Brewed with ground coffee");
    onComplete();
    state.isCoffeeBrewed = true;
  }, time);
}
function brewCoffeePromise(groundCoffee, time=1000) {
  return new Promise((resolve, reject) => {
    logger.pending("Step 3: Brew coffee");

    // Promise is PENDING
    setTimeout(() => {
      logger.success(`Brewed coffee`);
      resolve(true); // Promise is RESOLVED
    }, time); // resolve after 2 seconds
  });
}

function drinkCoffee() {
  logger.divider(30);
  console.log("Drinking coffee... Delicious!");
}

function makeCoffeeWithCallbacks() {
  /*
  * Welcome to Callback Hell!
  * Nested callbacks control the order of async code, but it's ugly.
  * Error handling is kind of a mess too.
  *
  * The code below is a pain to read and maintain. Does it actually work? Who knows?
  */

  console.log('Making coffee with callbacks...');
  logger.divider(30);

  boilWater(() => {
    const handleError = (err) => {
      logger.error(err.message);
    };

    try {
      grindCoffee(() => {
        try {
          brewCoffee(() => {
            try {
              drinkCoffee();
            } catch (err) {
              handleError(err);
            }
          }, brewTime);
        } catch (err) {
          handleError(err);
        }
      }, grindTime);
    } catch (err) {
      handleError(err);
    }
  }, boilTime);
}

function makeCoffeeWithPromises() {
  /*
   * This looks way better than the nested callback version!
   * It's also easier to handle errors (just catch it at the end)
   * We've escaped callback hell and now we're in...
   * Promise Purgatory
   */
  console.log('Making coffee with promises...');
  logger.divider(30);

  boilWaterPromise()
    .then(result => {
      state.isWaterBoiled = result;
      return grindCoffeePromise();
    })
    .then(result => {
      state.isCoffeeGround = result;
      return brewCoffeePromise();
    })
    .then(result => {
      state.isCoffeeBrewed = result;
      return drinkCoffee();
    })
    .catch(error => {
      logger.error(error);
    });
}

async function makeCoffeeWithAsyncAwait() {
  /*
   * This version uses async/await to make async code look synchronous.
   * This looks even nicer and more concise compared to promises.
   * Easier to read and maintain.
   * try/catch is back, but it works like the synchronous code that we all
   * know and love.
   */
  console.log('Making coffee with async/await...');
  logger.divider(30);

  try {
    const boilResult = await boilWaterPromise();
    state.isWaterBoiled = boilResult;
    const grindResult = await grindCoffeePromise();
    state.isCoffeeGround = grindResult;
    const brewResult = await brewCoffeePromise();
    state.isCoffeeBrewed = brewResult;
    drinkCoffee();
  } catch (error) {
    logger.error(error);
  }
}

function start(label) {
  switch(label) {
    case 'callbacks':
      makeCoffeeWithCallbacks();
      break;
    case 'promises':
      makeCoffeeWithPromises();
      break;
    case 'await':
      makeCoffeeWithAsyncAwait();
      break;
    default:
      logger.error("I don't know how to make coffee like that.");
      break;
  }
}

start('callbacks');
