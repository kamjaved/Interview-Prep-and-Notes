Alright, time to apply that theoretical knowledge! This challenge will combine your understanding of classes, `EventEmitter`, and basic asynchronous operations.

---

### Challenge: Smart Home Device Simulator

**Difficulty:** Medium (5-6/10)

**Scenario:**
You need to create a simplified simulation of a smart home environment. You'll have different types of smart devices (like a Light and a Thermostat) that can report their status changes. A central "Home Hub" will listen for these changes and react accordingly.

**Instructions:**

1. **Create a Base Class: `SmartDevice`**

   -  This class should `extend EventEmitter`.
   -  Its `constructor` should accept a `id` (string) and a `name` (string). Initialize these properties.
   -  It should have a method `reportStatus()` that emits a generic `'statusChange'` event. This event should pass the device's `id`, `name`, and a generic message (e.g., "Device is reporting status.") as arguments.

2. **Create Two Subclasses Extending `SmartDevice`:**

   -  **`SmartLight` Class:**
      -  `constructor(id, name, brightness)`:
         -  Call `super()` to initialize `id` and `name`.
         -  Initialize a property `brightness` (number, 0-100).
      -  Add a method `setBrightness(newBrightness)`:
         -  Update the `brightness` property.
         -  Emit a `'brightnessChanged'` event, passing the device's `id`, `name`, and the `newBrightness`.
         -  Also, call the parent's `reportStatus()` method to emit the generic status change.
   -  **`SmartThermostat` Class:**
      -  `constructor(id, name, targetTemperature)`:
         -  Call `super()` to initialize `id` and `name`.
         -  Initialize a property `targetTemperature` (number).
      -  Add a method `setTemperature(newTemp)`:
         -  Update the `targetTemperature` property.
         -  Emit a `'temperatureChanged'` event, passing the device's `id`, `name`, and the `newTemp`.
         -  Also, call the parent's `reportStatus()` method.
      -  **Bonus/Extra `emit`:** If the `newTemp` is greater than 25, also emit a `'heatingModeActive'` event, passing the `id` and `newTemp`.

3. **Create a Central Listener: `HomeHub`**

   -  This will be a regular class (it doesn't need to extend `EventEmitter` itself, as it just listens).
   -  Its `constructor` should take a `name` (string, e.g., "Main Hub").
   -  It should have a method `connectDevice(device)` that accepts an instance of `SmartDevice` (or its subclasses).
      -  Inside `connectDevice`, register listeners on the passed `device` for:
         -  The generic `'statusChange'` event.
         -  The `SmartLight`'s `'brightnessChanged'` event.
         -  The `SmartThermostat`'s `'temperatureChanged'` event.
         -  The `SmartThermostat`'s `'heatingModeActive'` event.
      -  Each listener should log a clear message indicating which device triggered it and what the change was.

4. **Demonstrate Usage:**
   -  Create an instance of `HomeHub`.
   -  Create a few instances of `SmartLight` and `SmartThermostat`.
   -  Connect each device to the `HomeHub` using the `connectDevice` method.
   -  Call various methods on your devices (`setBrightness`, `setTemperature`) to trigger the events and see the `HomeHub`'s reactions.
   -  **Optional:** After some operations, demonstrate how to stop listening for a specific event (e.g., disconnect one light's status change updates from the hub after a few changes).

**Your Goal:**

Write the Node.js code that implements these classes and demonstrates their interaction. Pay attention to:

-  Correct inheritance.
-  Proper use of `super()` in constructors and methods.
-  Emitting events with relevant data.
-  Registering listeners on the `HomeHub` for different events from different device types.

Take your time to structure the code logically. I'm excited to see your solution!
