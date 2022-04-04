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

function grind() {
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

function brew(groundCoffee) {
  log("Step 3: Brew coffee");
  return new Promise((resolve, reject) => {
    // Promise is PENDING
    setTimeout(() => {
      console.log(`Brewed coffee with ${groundCoffee}`);
      resolve("COFFEE"); // Promise is RESOLVED
    }, 4000); // resolve after 2 seconds
  });
}

function drink(coffee) {
  log(`Step 4: Drinking ${coffee}. Delicious!`);
}

function makeCoffeeWithPromise() {
  boilWater()
    .then((hotWater) => {
      console.log(hotWater);
      return grind();
    })
    .then(grounds => {
      return brew(grounds);
    })
    .then(coffee => {
      return drink(coffee);
    })
    .catch(error => {
      console.error(error);
    });
}

makeCoffeeWithPromise();

console.log("Sync code done!");