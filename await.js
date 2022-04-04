const log = console.log;

// Try changing this to `false` to see how async errors are handled
const coffeeGrinderWorks = true;

function boilWater() {
  return new Promise((resolve, reject) => {
    // Promise is PENDING
    log("Step 1: Boil water");
    setTimeout(() => {
      console.log("Done boiling");
      resolve("HOT WATER"); // Promise is RESOLVED
    }, 2000); // resolve after 2 seconds
  })
}

function grindCoffee() {
  log("Step 2: Grind coffee");
  return new Promise((resolve, reject) => {
    // Promise is PENDING
    if (coffeeGrinderWorks) {
      setTimeout(() => {
        console.log("Ground coffee");
        resolve("COFFEE GRINDS"); // Promise is RESOLVED
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
      resolve("COFFEE"); // Promise is RESOLVED
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
async function makeCoffeeAwait() {
  try {
    const boilResult = await boilWater();
    const grindResult = await grindCoffee(boilResult);
    const brewResult = await brewCoffee(grindResult);
    drinkCoffee(brewResult);
  } catch(error) {
    console.log(error);
  }
}


makeCoffeeAwait();

console.log("Sync Code is done!");