const state = {
  coffeeGrinderWorks: true,
  isWaterBoiled: false,
  isCoffeeGround: false,
  isCoffeeBrewed: false
};

function boilWater(onComplete) {
  const time = 2000; // 2 seconds

  console.log("⏳ Step 1: Boil water");
  setTimeout(() => {
    // this will run after 2 seconds
    console.log("✅ Done boiling");
    onComplete();
    //state.isWaterBoiled = true;
  }, time);
}

function grindCoffee(onComplete) {
  log("⏳ Step 2: Grind coffee");

  if (state.coffeeGrinderWorks) {
    const time = 1000; // 1 second

    setTimeout(() => {
      // This will run after 1 second
      console.log("✅ Ground coffee");
      onComplete();
      state.isCoffeeGround = true;
    }, time);
  } else {
    throw new Error("❌ Coffee grinder is broken!");
  }
}

function brewCoffee(onComplete) {
  if (!state.isCoffeeGround && !state.isWaterBoiled) {
    throw new Error("Can't brew coffee without grounds and hot water.")
  }

  const time = 4000; // 4 seconds

  log("⏳ Step 3: Brew coffee");

  setTimeout(() => {
    // This will run after 4 seconds
    console.log(`✅ Brewed with ground coffee`);
    onComplete();
    state.isCoffeeBrewed = true;
  }, time);
}

function drinkCoffee() {
  log("🎉 Step 4: Drinking coffee. Delicious!");
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
  console.log(err.message);
}

start();
