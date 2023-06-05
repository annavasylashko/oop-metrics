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

### 3. [calculateMOOD(classes, cls)](https://github.com/annavasylashko/oop-metrics/blob/main/metric.js#L76)
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
12. Calculate the **Polymorphism Factor (POF)** by calling the `calculatePOF` function _(described below)_ with the classes and cls parameters.
13. Return an object containing the calculated MOOD metrics.

### 3.1 [calculatePOF(classes, cls)](https://github.com/annavasylashko/oop-metrics/blob/main/metric.js#L133)
This function calculates the Polymorphism Factor (POF) for a given class.

1. Get all child classes that inherit from the given class by filtering the values of the `classes` object based on whether their prototype is an instance of `cls`.
2. Initialize an empty set `overriddenMethods` to store the overridden method names.
3. Iterate over each child class.
    * Get all property names of the child class's prototype using `Object.getOwnPropertyNames(childClass.prototype)`.
    * Check if each property is a non-constructor function and add its name to the `overriddenMethods` set.
4. Initialize an empty set `ownMethods` to store the own method names of the given class.
5. Get all property names of the given class's prototype using `Object.getOwnPropertyNames(cls.prototype)`.
    * Check if each property is a non-constructor function and add its name to the `ownMethods` set.
6. Initialize `pof` (Polymorphism Factor) to 0.
7. Iterate over each own method of the given class.
    * Check if the method is overridden in any child class by checking if the `overriddenMethods` set contains the method name.
    * If it is overridden, increment the `pof` by 1.
8. Return `pof` value.

## Usage
Enter command `node test.js` to compile [test file](https://github.com/annavasylashko/oop-metrics/blob/main/test.js).

The output will contain all calculated metrics for each class written in this file:

<img width="730" alt="lab3result" src="https://github.com/annavasylashko/oop-metrics/assets/50664700/79d6bd75-047e-49e3-b1c9-ef6dc301cd4a">
