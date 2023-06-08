# OOP metrics toolset
This toolset provides functions for calculating various metrics related to class inheritance and polymorphism.

The toolset includes the following functions:

### 1. [calculateDIT(cls)](https://github.com/annavasylashko/oop-metrics/blob/main/metric.js#L40)
This function calculates the depth of the inheritance tree for a given class.

1. Initialize a variable `depth` to 0.
2. Use a while loop to traverse the prototype chain of the class until reaching the top-level `Object.prototype`.
    * In each iteration, increment the `depth` by 1.
    * Move up the prototype chain by setting cls to the constructor of the current prototype's parent.
3. Return the `depth`, which represents the number of levels in the inheritance tree.

### 2. [calculateNOC(classes, cls)](https://github.com/annavasylashko/oop-metrics/blob/main/metric.js#L59)
This function calculates the number of direct subclasses for a given class within a set of classes.

1. Initialize a variable `count` to 0.
2. Iterate over each property (`key`) in the `classes` object.
    * Check if the prototype of the current class matches the prototype of the given class (`cls`) by comparing `classes[key].prototype.__proto__` with **cls.prototype**.
    * If they match, increment the `count` by 1.
3. Return the `count` which represents the number of direct subclasses for the given class.

### 3. [calculateMOOD(cls)](https://github.com/annavasylashko/oop-metrics/blob/main/metric.js#L75)
This function calculates the MOOD metrics (Metrics for Object Oriented Design) for a given class.

1. Initialize arrays `inheritedMethods` and `inheritedProperties`
2. Get the prototype of the given class (`cls`) using `Object.getPrototypeOf(cls.prototype)`.
3. Use a while loop to traverse the prototype chain until reaching `Object.prototype`.
    * Get all property names of the current prototype using `Object.getOwnPropertyNames(prototype)`.
    * Filter and collect inherited methods and properties by adding the method names (if their type is a function) to `inheritedMethods` and the property names (if their type is not a function) to `inheritedProperties`.
    * Move up the prototype chain by setting prototype to the prototype of the current prototype.
4. Remove duplicates from `inheritedProperties` by converting it to a set and then back to an array.
5. Filter out the 'constructor' method from `inheritedMethods` and remove duplicates same way as above.
6. Get the own methods and properties of the given class (`cls.prototype`) by using `Object.getOwnPropertyNames(cls.prototype)` and filtering them based on their types.
7. Combine the inherited and own methods into `allMethods` by concatenating `inheritedMethods` and `ownMethods`.
8. Calculate the **Method Inheritance Factor (MIF)** by dividing the length of `inheritedMethods` by the length of `allMethods`.
9. Calculate the **Methods Hidden Factor (MHF)** by filtering `inheritedMethods` to include only methods that are not present in `ownMethods` and counting the number of such methods.
10. Calculate the **Attribute Hiding Factor (AHF)** by filtering `inheritedProperties` to include only properties that are not present in `ownProperties` and counting the number of such properties.
11. Calculate the **Attribute Inheritance Factor (AIF)** by dividing the length of `inheritedProperties` by the length of `allProperties`.
12. Return an object containing the calculated MOOD metrics.

### 4 [calculatePOF(classes)](https://github.com/annavasylashko/oop-metrics/blob/main/metric.js#L128)
This function calculates the Polymorphism Factor (POF) for a set of classes. The POF metric is used to measure the extent of method overriding in the inheritance hierarchy of classes.


Polymorphism Factor Calculator
This code snippet provides a function called calculatePOF that calculates the Polymorphism Factor (POF) for a set of classes. The POF metric is used to measure the extent of method overriding in the inheritance hierarchy of classes.

1. The function accepts an `Object` parameter `classes`, which contains all the classes to be considered for calculating the POF.
2. Two variables, `up` and `down`, are initialized to zero. These variables will be used to calculate the numerator and denominator of the POF.
3. The function iterates over each class in the `classes` object using `Object.values(classes).forEach((cls) => { ... })`.
4. For each class, it initializes an empty array called `inheritedMethods` to collect the inherited methods.
5. It starts traversing the prototype chain of the class's prototype until it reaches `Object.prototype`. This is done using a `while` loop.
6. Within the loop, it gets all the property names of the current prototype using `Object.getOwnPropertyNames(prototype)`.
7. It filters and collects only the inherited methods by checking the type of each property (function) using `typeof prototype[name] === 'function'`.
8. It excludes the constructor method from the inherited methods using `inheritedMethods = inheritedMethods.filter((method) => method !== 'constructor')`.
9. It moves up the prototype chain by assigning the current prototype's prototype to the `prototype` variable: `prototype = Object.getPrototypeOf(prototype)`.
10. After the loop, it adds the length of `inheritedMethods` to the `up` variable, representing the numerator of the POF.
11. It retrieves all the own methods of the class's prototype using `Object.getOwnPropertyNames(cls.prototype).filter((name) => typeof cls.prototype[name] === 'function')`.
12. It excludes the constructor method from the own methods using `ownMethods = ownMethods.filter((method) => method !== 'constructor')`.
13. It filters the own methods to keep only those that are not present in the inherited methods using `ownMethods = ownMethods.filter((method) => !inheritedMethods.includes(method))`.
14. It retrieves all the child classes that inherit from the given class by checking the `prototype` chain using `Object.values(classes).filter((childClass) => childClass.prototype instanceof cls)`.
15. It calculates the contribution to the denominator of the POF by multiplying the length of `ownMethods` with the number of child classes plus one: `ownMethods.length * (childClasses.length + 1)`.
16. It adds the contribution to the `down` variable, representing the denominator of the POF.
17. After iterating over all the classes, it returns the POF value by dividing `up` by `down`.

## Usage
Enter command `node test.js` to compile [test file](https://github.com/annavasylashko/oop-metrics/blob/main/test.js).

The output will contain all calculated metrics for each class written in this file:
<img width="657" alt="result" src="https://github.com/annavasylashko/oop-metrics/assets/50664700/c9c0f946-db0c-4278-a65f-cf95da0ae38d">
