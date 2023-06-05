/**
 * This toolset provides functions for calculating various metrics related to class inheritance and polymorphism.
 *
 * To use this toolset, create an object containing all the module classes to be considered. Each class should be
 * represented as a property in the object, with the class name as the property key and the class itself as the property value.
 *
 * Example usage:
 * ```
 * import { calculateDIT, calculateNOC, calculateMOOD } from './metric.js';
 *
 * const allClasses = {
 *   BaseClass,
 *   ChildClass1,
 *   ChildClass2,
 *   GrandchildClass1,
 *   GrandchildClass2
 * };
 *
 *  console.log(`DIT: ${calculateDIT(cls)}`);
 *  console.log(`NOC: ${calculateNOC(allClasses, cls)}`);
 *  console.log("MOOD: ", calculateMOOD(allClasses, cls));
 *  const metrics = calculateMOOD(allClasses, BaseClass);
 *  console.log(metrics);
 * ```
 *
 * The toolset includes the following functions:
 * - `calculateDIT(cls)`: Calculates the depth of the inheritance tree for a given class.
 * - `calculateNOC(classes, cls)`: Calculates the number of direct subclasses for a given class.
 * - `calculateMOOD(classes, cls)`: Calculates the MOOD metrics (Method Inheritance Factor, Methods Hidden Factor,
 *   Attribute Hiding Factor, Attribute Inheritance Factor, and Polymorphism Factor) for a given class.
 *
 * @module MetricJS
 */

/**
 * Calculates the depth of the inheritance tree for a given class.
 * @param {Function} cls - The class to calculate the depth of the inheritance tree for.
 * @returns {number} The depth of the inheritance tree for the given class.
 */
function calculateDIT(cls) {
    let depth = 0;
    
    // Traverse the prototype chain until reaching the top-level Object.prototype
    while (cls.prototype.__proto__ !== null) {
        depth++;

        // Move up the prototype chain to the next level
        cls = cls.prototype.__proto__.constructor;
    }
    return depth;
}

/**
Calculates the number of direct subclasses for a given class within a set of classes.
@param {Object} classes - An object containing all classes to be considered.
@param {Function} cls - The class to calculate the number of direct subclasses for.
@returns {number} The number of direct subclasses for the given class.
*/
function calculateNOC(classes, cls) {
    let count = 0;
    for (const key in classes) {
        // Check if the prototype of the current class matches the prototype of the given class
        if (classes[key].prototype.__proto__ === cls.prototype) {
            count++;
        }
    }
    return count;
}

/**
 * Calculates the MOOD metrics (Method Inheritance Factor) for a given class.
 * @param {Object} classes - An object containing all classes to be considered.
 * @param {Function} cls - The class to calculate the MOOD metrics for.
 * @returns {Object} An object containing the MOOD metrics for the given class.
 */
function calculateMOOD(classes, cls) {
    let inheritedMethods = [];
    let inheritedProperties = [];
    let prototype = Object.getPrototypeOf(cls.prototype);

    // Traverse the prototype chain until reaching the Object.prototype
    while (prototype !== Object.prototype) {
        // Get all property names of the prototype
        const propertyNames = Object.getOwnPropertyNames(prototype);

        // Filter and collect inherited methods and properties
        inheritedMethods.push(...propertyNames.filter((name) => typeof prototype[name] === 'function'));
        inheritedProperties.push(...propertyNames.filter((name) => typeof prototype[name] !== 'function'));
       
        // Move up the prototype chain
        prototype = Object.getPrototypeOf(prototype);
    }

    // Remove duplicates from inherited properties
    inheritedProperties = [...new Set(inheritedProperties)]

    // Filter out 'constructor' method from inherited methods
    inheritedMethods = [...new Set(inheritedMethods.filter((method) => method !== 'constructor'))];

    // Get own methods and properties of the class
    let ownMethods = Object.getOwnPropertyNames(cls.prototype).filter((name) => typeof cls.prototype[name] === 'function');
    ownMethods = ownMethods.filter((method) => method !== 'constructor');
    let ownProperties = Object.getOwnPropertyNames(cls.prototype).filter((name) => typeof cls.prototype[name] !== 'function');

    // Combine inherited and own methods and properties
    const allMethods = [...new Set(inheritedMethods.concat(ownMethods))];
    const allProperties = [...new Set(inheritedProperties.concat(ownProperties))];

    // Method Inheritance Factor (MIF)
    const mif = inheritedMethods.length / allMethods.length;

    // Methods Hidden Factor (MHF)
    const mhf = inheritedMethods.filter((method) => !ownMethods.includes(method)).length;

    // Attribute Hiding Factor (AHF)
    const ahf = inheritedProperties.filter((property) => !ownProperties.includes(property)).length;

    // Attribute Inheritance Factor (AIF)
    const aif = inheritedProperties.length / allProperties.length

    // Polymorphism Factor (POF)
    const pof = calculatePOF(classes, cls)

    return { mif, mhf, ahf, aif, pof };
}

/**
 * Calculates the Polymorphism Factor (POF) for a given class.
 * @param {Object} classes - An object containing all classes to be considered.
 * @param {Function} cls - The class to calculate the POF for.
 * @returns {number} The Polymorphism Factor (POF) for the given class.
 */
function calculatePOF(classes, cls) {
    // Get all child classes that inherit from the given class
    const childClasses = Object.values(classes).filter((childClass) => {
        return childClass.prototype instanceof cls;
    });

    const overriddenMethods = new Set();
    childClasses.forEach((childClass) => {
        // Get all property names of the child class's prototype
        Object.getOwnPropertyNames(childClass.prototype).forEach((method) => {
            // Check if the property is a non-constructor function
            if (method !== 'constructor' && typeof childClass.prototype[method] === 'function') {
                // Add the method to the overridden methods set
                overriddenMethods.add(method);
            }
        });
    });

    const ownMethods = new Set();
    // Get all property names of the given class's prototype
    Object.getOwnPropertyNames(cls.prototype).forEach((method) => {
        // Check if the property is a non-constructor function
        if (method !== 'constructor' && typeof cls.prototype[method] === 'function') {
            // Add the method to the own methods set
            ownMethods.add(method);
        }
    });

    // Initialize the Polymorphism Factor (POF)
    let pof = 0;

    // Iterate over each own method of the given class
    ownMethods.forEach((method) => {
        // Check if the method is overridden in any child class
        if (overriddenMethods.has(method)) {
            // Increment the POF
            pof++;
        }
    });

    return pof;
}

export { calculateDIT, calculateNOC, calculateMOOD }