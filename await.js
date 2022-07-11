const log = console.log;

// Try changing this to `false` to see how async errors are handled
const coffeeGrinderWorks = false;

function boilWater() {
  return new Promise((resolve, reject) => {
    // Promise is PENDING
    log("Step 1: Boil water");
    setTimeout(() => {
      console.log("Done boiling");
      resolve(true); // Promise is RESOLVED
    }, 2000); // resolve after 2 seconds
  });
}

function grindCoffee() {
  log("Step 2: Grind coffee");
  return new Promise((resolve, reject) => {
    // Promise is PENDING
    if (coffeeGrinderWorks) {
      setTimeout(() => {
        console.log("Ground coffee");
        resolve(true); // Promise is RESOLVED
      }, 2000); // resolve after 2 seconds
    } else {
      reject("Coffee grinder is broken!"); // Promise is REJECTED
    }
  });
}

function brewCoffee(groundCoffee) {
  log("Step 3: Brew coffee");
  return new Promise((resolve, reject) => {
    // Promise is PENDING
    setTimeout(() => {
      console.log(`Brewed coffee with ${groundCoffee}`);
      resolve(true); // Promise is RESOLVED
    }, 4000); // resolve after 2 seconds
  });
}

function drinkCoffee(coffee) {
  log(`Step 4: Drinking ${coffee}. Delicious!`);
}

/**
 * This version uses a Promise chain to guarantee
 * the order of async function execution
 * using .then
 */
async function start() {
  try {
    const boilResult = await boilWater();
    console.log(boilResult);
    const grindResult = await grindCoffee();
    console.log(grindResult);
    const brewResult = await brewCoffee();
    console.log(brewResult);
    drinkCoffee();
  } catch(error) {
    console.log(error);
  }
}

start();
