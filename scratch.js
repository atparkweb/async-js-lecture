// TODO: Define state object with properties:
// - [ ] isWaterBoiled
// - [ ] isCoffeeGround
// - [ ] isCoffeeBrewed
const state = {
  isWaterBoiled: false,
  isCoffeeGround: false,
  isCoffeeBrewed: false
};

function boilWater(onComplete) {
  if (!state.isWaterBoiled) {
    // set boil time 2s (we don't have time for realtime)
    const time = 2000; // 2 seconds

    // log a message "Step 1: Boiling water"
    const message = "Step 1: Boiling water";
    console.log(message);

    // after time has elapsed
    setTimeout(() => {
      console.log("Water is ready.");
      state.isWaterBoiled = true;
      onComplete();
      drinkCoffee();
    }, time);
  }
}

function grindCoffee(onComplete) {
  // set grind time 1000
  const time = 1000; // 1 second

  // log a message "Step 2: Grinding coffee"
  console.log("Step 2: Grinding coffee");

  // after time has elapsed
  setTimeout(() => {
    console.log("Done grinding coffee.");
    state.isCoffeeGround = true;
    onComplete();
  }, time);

  // TODO: add state, coffeeGrinderWorks, simulate error if it's false
}

function brewCoffee(onComplete) {
  if (state.isCoffeeGround && state.isWaterBoiled) {
    // set brew time 4000
    const time = 4000; // 4 seconds

    // log a message "Step 3: Brewing coffee"
    console.log("Step 3: Brewing coffee");

    // after time has elapsed
    setTimeout(() => {
      console.log("Coffee is ready!");
      state.isCoffeeBrewed = true;
      onComplete();
    }, time);
  }
}

function drinkCoffee() {
  if (state.isCoffeeBrewed) {
    console.log("Delicious!");
  }
}

function start() {
  boilWater(() => {
    grindCoffee(() => {
        brewCoffee(() => {
          drinkCoffee();
        });
      })
    });

  // 1. run all functions in sequence
  // 2. refactor to use callbacks
  // 3. try adding error handling
}

start();
// TODO: Call sync function here