Let's solidify your understanding with a hands-on task.

**Task: Building a Vehicle Hierarchy**

**Instructions:**

1. **Create a base class named `Vehicle`**.

   -  This class should have a `constructor` that accepts a `name` (string) and initializes a property called `name` with this value.
   -  The `Vehicle` class should also have a method called `startEngine()` that logs a message to the console indicating that the engine of the vehicle has started (e.g., "The engine of [vehicle name] is starting...").

2. **Create two subclasses that extend the `Vehicle` class:**

   -  **`Car` class:**
      -  Its `constructor` should accept a `name` (string) and a `model` (string).
      -  It should call the `super()` constructor to initialize the `name` property from the `Vehicle` class.
      -  It should also initialize its own property called `model` with the provided model.
      -  Override the `startEngine()` method in the `Car` class to first call the `startEngine()` method of the parent class (using `super.startEngine()`) and then log an additional message specific to a car starting (e.g., "[Car name] (Model: [car model]) is ready to drive!").
   -  **`Motorcycle` class:**
      -  Its `constructor` should accept a `name` (string) and a `type` (string, e.g., "Sportbike", "Cruiser").
      -  It should call the `super()` constructor to initialize the `name` property.
      -  It should also initialize its own property called `type` with the provided type.
      -  Override the `startEngine()` method in the `Motorcycle` class to first log a message specific to a motorcycle starting (e.g., "Kicking the starter for [motorcycle name]..."). Then, call the `startEngine()` method of the parent class using `super.startEngine()`.

3. **Create instances (objects) of both the `Car` and `Motorcycle` classes.** Give them appropriate names and other properties.

4. **Call the `startEngine()` method on each of the created instances.**

**Your Goal:**

Write the Node.js code that implements these classes and demonstrates their usage.
