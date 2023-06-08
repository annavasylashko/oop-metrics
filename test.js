class BaseClass {
    constructor() {
        this.baseAttribute = 'Base Attribute';
    }

    get attribute() {
        this.baseAttribute
    }

    baseMethod() {
        console.log("Base method");
    }
}

class ChildClass1 extends BaseClass {
    constructor() {
        super();
        this.childAttribute = 'Child Attribute';
    }

    get attribute() {
        this.childAttribute
    }

    some() {
        console.log("ChildClass1 method");
    }

    additionalMethod() {
        console.log("Additional method in ChildClass1");
    }

    additionalMethod2() {
        console.log("Additional method in ChildClass1");
    }

    baseMethod() {
        console.log("Overridden baseMethod in ChildClass1");
    }
}

class GrandchildClass1 extends ChildClass1 {
    anotherMethod() {
        console.log("GrandchildClass1 method");
    }

    additionalMethod() {
        console.log("Overriden additionalMethod in GrandchildClass1");
    }

    additionalMethod2() {
        console.log("Overriden additionalMethod2 in GrandchildClass1");
    }
}

class ChildClass2 extends BaseClass {
    anotherMethod() {
        console.log("ChildClass2 method");
    }
}

class GrandchildClass2 extends ChildClass2 {
    extraMethod() {
        console.log("GrandchildClass2 method");
    }
}

export { BaseClass, ChildClass1, ChildClass2, GrandchildClass1, GrandchildClass2 }

import { calculateDIT, calculateNOC, calculateMOOD, calculatePOF } from './metric.js';

const allClasses = {
    BaseClass,
    ChildClass1,
    ChildClass2,
    GrandchildClass1,
    GrandchildClass2
};

for (const key in allClasses) {
    const cls = allClasses[key];
    console.log(`${key} DIT: ${calculateDIT(cls)}`);
    console.log(`${key} NOC: ${calculateNOC(allClasses, cls)}`);
    console.log(`${key} MOOD:`, calculateMOOD(cls));

    console.log()
}

console.log(`POF: ${calculatePOF(allClasses)}`)