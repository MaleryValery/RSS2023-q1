video [link](https://youtu.be/WIsYj-XeZ8o)
slides [link](https://rolling-scopes-school.github.io/maleryvalery-JSFE2023Q1/presentation/)

Slide 1: Title Slide
Title: TypeScript - Introduction
Subtitle: A Superset of JavaScript for Strong Typing

Slide 2: What is TypeScript?
TypeScript is a powerful programming language developed by Microsoft, first released in 2012.
It is an open-source superset of JavaScript, meaning all JavaScript code is valid TypeScript, making it easy to migrate existing projects.
TypeScript adds static typing, which allows developers to specify the types of variables, function parameters, and return values.
Additional features like interfaces, classes, enums, and generics enhance code organization and maintainability.

Slide 3: Advantages of TypeScript
	IDE Support
	TypeScript is designed to integrate seamlessly with modern IDEs, offering rich language support and advanced code analysis.
	Popular editors like Visual Studio Code provide real-time error highlighting, auto-completion, and intelligent code suggestions for TypeScript projects.
	Developers can navigate code more efficiently and benefit from TypeScript's tooling, improving productivity.

	Static Typing
	TypeScript's static typing brings a new level of type safety to JavaScript, catching errors at compile time instead of runtime.
	This reduces the risk of type-related bugs, making code more robust and reliable in the long run.
	Early detection of type errors simplifies debugging and results in more stable applications.

Slide 4: Example - Static Typing
This slide provides an example of the power of static typing in TypeScript.
In JavaScript, the greet function can accept any argument and return any value without type constraints.
In TypeScript, by explicitly specifying the string type for the name parameter and the return value, we ensure that only valid strings can be used in this function.

Slide 5: Type Inference
TypeScript's type inference allows developers to omit type annotations, as the compiler can deduce types from context.
Type inference reduces the need for explicit type declarations, making code more concise and readable.

Example - Type Inference
This slide demonstrates TypeScript's ability to infer types automatically based on the context.
When the age variable is initialized with a numeric value, TypeScript infers its type as number.
The isAdult function uses the inferred type from the age parameter to define the return type as boolean, providing type safety without extra annotations.

Slide 7: Interfaces
TypeScript interfaces define the structure of objects, ensuring consistency across the application.
They act as contracts, establishing what properties and methods an object should have.

Example - Interfaces
This slide highlights the importance of interfaces in TypeScript.
The Person interface specifies the required properties name (a string) and age (a number).
The displayPerson function expects an argument of type Person, guaranteeing that it will only work with objects adhering to the Person interface.

Slide 9: Enums
Enums in TypeScript are a helpful way to define a set of named constants.
They provide meaningful names to values, improving code readability.


Example - Enums
This slide demonstrates the use of enums to represent colors in TypeScript.
The Color enum defines constants for Red, Green, and Blue.
Using enums enhances code clarity by using descriptive names rather than arbitrary numbers or strings.

Slide 10: Classes
TypeScript embraces object-oriented programming concepts with classes.
Classes define blueprints for creating objects with properties and methods.

Example - Classes
This slide illustrates class inheritance in TypeScript.
The Animal class serves as a base class with a constructor and the makeSound method.
The Dog class extends Animal and overrides the makeSound method.
Creating a Dog instance demonstrates the inheritance behavior.

Slide 11: Abstract Classes
TypeScript allows defining abstract classes, which cannot be instantiated directly.
Abstract classes serve as a blueprint for other classes and may include abstract methods, which must be implemented in the derived classes.

Example - Abstract Classes
This slide showcases an abstract class Shape, defining an abstract method calculateArea.
The calculateArea method lacks implementation in the Shape class.
The Circle and Rectangle classes extend Shape and provide concrete implementations of calculateArea.

Slide 12: Static Classes and Methods
TypeScript supports static classes and methods that belong to the class rather than instances.
Static methods are invoked directly on the class without creating instances.

Example - Static Classes and Methods
This slide demonstrates the usage of static classes and methods in TypeScript.
The MathUtility class is a static class containing a static method add for adding two numbers.
We use the static method without creating an instance of the MathUtility class.

Slide 13: Public, Protected, and Private Members
TypeScript supports access modifiers for class members, controlling their visibility and accessibility.

Slide 14: Public Members
Public members are accessible from anywhere, both within and outside the class.
By default, all class members are public if no access modifier is specified.

Slide 15: Protected Members
Protected members are accessible within the class and its subclasses (derived classes).
They cannot be accessed from outside the class hierarchy.

Slide 16: Private Members
Private members are accessible only within the class where they are defined.
They are not accessible outside the class, including in its derived classes.


Slide 17: Generics
TypeScript's generics enable developers to create flexible and reusable code that works with various data types.
Generics provide a way to write generic functions and classes, adapting to different types.
Example - Generics
This slide showcases a generic function, reverse, capable of reversing arrays of any type.
The type parameter T allows the function to maintain type safety while accommodating various data types.

Slide 18: Conclusion
TypeScript is a valuable tool that enhances JavaScript development with static typing and advanced features.
Its benefits include better code quality, increased maintainability, and improved productivity.
Embracing TypeScript empowers developers to build robust and scalable applications.

