const logger = require('./logger');
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
function boilWaterPromise() {
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
function grindCoffeePromise() {
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
function brewCoffeePromise(groundCoffee) {
  const time = 4000; // 4 seconds

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
  console.log('Making coffee with callbacks...');
  logger.divider(30);
  /*
  * This is callback hell.
  * Nested callbacks control the order of async code, but it's ugly.
  * Handling errors is kind of a mess.
  */
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
function makeCoffeeWithPromises() {
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

/**
 * This version uses async/await to make async code look synchronous
 */
async function makeCoffeeWithAsyncAwait() {
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

start('await');
