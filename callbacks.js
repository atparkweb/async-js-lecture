const log = console.log;

// Try changing this to `false` to see how async errors are handled
const state = {
  coffeeGrinderWorks: true,
  isWaterBoiled: false,
  isCoffeeGround: false,
  isCoffeeBrewed: false
};

function boilWater(onComplete) {
  const time = 2000; // 2 seconds

  log("⏳ Step 1: Boil water");
  setTimeout(() => { // this will run after 2 seconds
    console.log("✅ Done boiling");
    onComplete();
    //state.isWaterBoiled = true;
  }, time);
}

function grindCoffee(onComplete) {
  log("⏳ Step 2: Grind coffee");

  if (state.coffeeGrinderWorks) {
    const time = 2000; // 2 seconds

    setTimeout(() => { // This will run after 2 seconds
      console.log("✅ Ground coffee");
      onComplete();
      //state.isCoffeeGround = true;
    }, time);
  } else {
    throw new Error("❌ Coffee grinder is broken!");
  }
}

function brewCoffee(onComplete) {
  if (!state.isCoffeeGround && !state.isWaterBoiled) {
    throw new Error("Can't brew coffee without grounds and hot water.")
  }

  const time = 4000; // four seconds

  log("⏳ Step 3: Brew coffee");

  setTimeout(() => { // This will run after 4 seconds
    console.log(`✅ Brewed with ground coffee`);
    onComplete();
  }, time);
}

function drinkCoffee() {
  log("🎉 Step 4: Drinking coffee. Delicious!");
}


/**
 * This is callback hell. Nested callbacks are a
 * way to control the order of async code.
 */
 function makeCoffeeWithCallbacks() {
    boilWater(() => {
      try {
        grindCoffee(() => {
          try {
            brewCoffee(() => {
              drinkCoffee();
            });
          } catch (err) {
            console.log(err.message);
          }
        });
      } catch (err) {
        console.log(err.message);
      }
    });
}

makeCoffeeWithCallbacks();