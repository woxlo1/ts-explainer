import type { ErrorPattern } from "./types.js";

export const patterns: ErrorPattern[] = [
  {
    id: "type-not-assignable",
    code: "TS2322",
    match: /Type '(.+)' is not assignable to type '(.+)'\.?$/,
    explain: (m) =>
      `You're trying to use a value of type '${m[1]}' where type '${m[2]}' is expected. ` +
      `Check the value you're assigning, or update the target type if '${m[1]}' should actually be allowed there.`,
  },
  {
    id: "property-does-not-exist",
    code: "TS2339",
    match: /Property '(.+)' does not exist on type '(.+)'\.?$/,
    explain: (m) =>
      `You're accessing '.${m[1]}' on something typed as '${m[2]}', but that type has no such property. ` +
      `This usually means a typo, a missing type definition, or the object hasn't been narrowed to the right type yet.`,
  },
  {
    id: "possibly-undefined",
    code: "TS18048",
    match: /'(.+)' is possibly 'undefined'\.?$/,
    explain: (m) =>
      `'${m[1]}' might be 'undefined' at this point. ` +
      `Add a check (like 'if (${m[1]})' or optional chaining '?.'), or use a non-null assertion '!' if you're certain it's always defined here.`,
  },
  {
    id: "argument-mismatch",
    code: "TS2345",
    match: /Argument of type '(.+)' is not assignable to parameter of type '(.+)'\.?$/,
    explain: (m) =>
      `You're calling a function with an argument of type '${m[1]}', but it expects type '${m[2]}'. ` +
      `Double-check the value you're passing in, or the function's parameter type.`,
  },
  {
    id: "cannot-find-name",
    code: "TS2304",
    match: /Cannot find name '(.+)'\.?$/,
    explain: (m) =>
      `'${m[1]}' isn't defined anywhere TypeScript can see. ` +
      `This is usually a missing import, a typo, or a missing @types package for a third-party library.`,
  },
  {
    id: "object-possibly-null",
    code: "TS2531",
    match: /Object is possibly 'null'\.?$/,
    explain: () =>
      `This value could be 'null' here. ` +
      `Add a check (like 'if (value !== null)') or optional chaining '?.' before using it, or use a non-null assertion '!' if you're certain it can't be null at this point.`,
  },
  {
    id: "missing-required-properties",
    code: "TS2741",
    match: /Property '(.+)' is missing in type '(.+)' but required in type '(.+)'\.?$/,
    explain: (m) =>
      `The object you're providing (of type '${m[2]}') is missing the required property '${m[1]}' that '${m[3]}' expects. ` +
      `Add '${m[1]}' to the object, or make it optional in the type definition if it shouldn't be required.`,
  },
  {
    id: "wrong-argument-count",
    code: "TS2554",
    match: /Expected (\d+) arguments?, but got (\d+)\.?$/,
    explain: (m) =>
      `This function expects ${m[1]} argument(s), but it's being called with ${m[2]}. ` +
      `Check the function's signature and make sure you're passing the right number of arguments.`,
  },
  {
    id: "implicit-any-parameter",
    code: "TS7006",
    match: /Parameter '(.+)' implicitly has an '(.+)' type\.?$/,
    explain: (m) =>
      `The parameter '${m[1]}' doesn't have an explicit type, so TypeScript is falling back to '${m[2]}'. ` +
      `Add a type annotation (e.g. '${m[1]}: string') to get proper type checking here.`,
  },
  {
    id: "no-overload-matches",
    code: "TS2769",
    match: /No overload matches this call\.?$/,
    explain: () =>
      `None of this function's overloads accept the arguments you're passing. ` +
      `Check the function's available signatures (hover over it in your editor) and compare them against what you're passing in — usually one argument's type is slightly off.`,
  },

  {
    id: "did-you-mean",
    code: "TS2551",
    match: /Property '(.+)' does not exist on type '(.+)'\. Did you mean '(.+)'\?\.?$/,
    explain: (m) =>
      `'.${m[1]}' doesn't exist on type '${m[2]}'. TypeScript thinks you meant '.${m[3]}' — check for a typo.`,
  },

  {
    id: "not-callable",
    code: "TS2349",
    match: /This expression is not callable\./,
    explain: () =>
      `You're trying to call something as a function, but its type says it isn't callable. ` +
      `Check whether the variable actually holds a function, or if you're missing parentheses somewhere.`,
  },

  {
    id: "possibly-undefined-access",
    code: "TS2532",
    match: /Object is possibly 'undefined'\.?$/,
    explain: () =>
      `This value might be 'undefined' at this point. ` +
      `Add a check (like 'if (value !== undefined)') or use optional chaining '?.' before accessing it.`,
  },

  {
    id: "readonly-cannot-assign",
    code: "TS2540",
    match: /Cannot assign to '(.+)' because it is a read-only property\.?$/,
    explain: (m) =>
      `'${m[1]}' is marked as 'readonly' and cannot be reassigned after initialization. ` +
      `If you need to change this value, remove the 'readonly' modifier from the type definition.`,
  },

  {
    id: "cannot-find-module",
    code: "TS2307",
    match: /Cannot find module '(.+)' or its corresponding type declarations\.?$/,
    explain: (m) =>
      `TypeScript can't find the module '${m[1]}'. ` +
      `Check that the package is installed ('npm install ${m[1]}'), and if it's a third-party library, you may also need '@types/${m[1]}' for type declarations.`,
  },

  {
    id: "type-has-no-index-signature",
    code: "TS7053",
    match: /Element implicitly has an 'any' type because expression of type '(.+)' can't be used to index type '(.+)'\./,
    explain: (m) =>
      `You're indexing into '${m[2]}' with a key of type '${m[1]}', but that type has no index signature. ` +
      `Either add an index signature to the type, or use 'keyof' to constrain the key type.`,
  },

  {
    id: "union-not-narrowed",
    code: "TS2367",
    match: /This condition will always return '(.+)' since the types '(.+)' and '(.+)' have no overlap\.?$/,
    explain: (m) =>
      `Comparing '${m[2]}' and '${m[3]}' will always be '${m[1]}' because these two types can never be equal. ` +
      `This is usually a sign that a variable was narrowed to an unexpected type, or there's a logic error in your condition.`,
  },

  {
    id: "missing-return-type",
    code: "TS2366",
    match: /Function lacks ending return statement and return type does not include 'undefined'\.?$/,
    explain: () =>
      `Not all code paths in this function return a value, but the return type doesn't include 'undefined'. ` +
      `Either add a return statement at the end, or update the return type to include '| undefined'.`,
  },

  {
    id: "abstract-class-instantiation",
    code: "TS2511",
    match: /Cannot create an instance of an abstract class\.?$/,
    explain: () =>
      `You're trying to use 'new' on an abstract class, which isn't allowed. ` +
      `Abstract classes are meant to be extended, not instantiated directly — create a concrete subclass and instantiate that instead.`,
  },

  {
    id: "conversion-may-be-mistake",
    code: "TS2352",
    match: /Conversion of type '(.+)' to type '(.+)' may be a mistake because neither type sufficiently overlaps with the other\./,
    explain: (m) =>
      `Casting '${m[1]}' to '${m[2]}' looks suspicious because these types don't share enough in common. ` +
      `If you're sure about the cast, use 'unknown' as an intermediate step: '(value as unknown) as ${m[2]}'. Otherwise double-check your types.`,
  },
  {
    id: "unused-variable",
    code: "TS6133",
    match: /'(.+)' is declared but its value is never read\.?$/,
    explain: (m) =>
      `'${m[1]}' is declared but never used. ` +
      `Either remove it, use it somewhere, or prefix it with an underscore ('_${m[1]}') to signal it's intentionally unused.`,
  },
  {
    id: "no-exported-member",
    code: "TS2614",
    match: /Module '(.+)' has no exported member '(.+)'\.?$/,
    explain: (m) =>
      `'${m[2]}' doesn't exist as a named export in '${m[1]}'. ` +
      `Check the module's exports (its index file or type declarations), or look for a typo in the import name.`,
  },
  {
    id: "type-used-as-value",
    code: "TS2693",
    match: /'(.+)' only refers to a type, but is being used as a value here\.?$/,
    explain: (m) =>
      `'${m[1]}' is a type, not a value — you can't use it at runtime. ` +
      `If you need a runtime check, use 'typeof' or create a class or enum instead.`,
  },
  {
    id: "cannot-invoke-possibly-undefined",
    code: "TS2722",
    match: /Cannot invoke an object which is possibly 'undefined'\.?$/,
    explain: () =>
      `This function might be 'undefined' and can't be safely called. ` +
      `Add a check before calling it (e.g. 'if (fn) fn()') or use optional call syntax 'fn?.()'.`,
  },
  {
    id: "override-keyword-required",
    code: "TS4114",
    match: /This member must have an 'override' modifier because it overrides a member in the base class '(.+)'\.?$/,
    explain: (m) =>
      `This method overrides one in '${m[1]}' but is missing the 'override' keyword. ` +
      `Add 'override' before the method name to make the intent explicit and catch accidental overrides.`,
  },
  {
    id: "array-implicit-any",
    code: "TS7015",
    match: /Element implicitly has an 'any' type because index expression is not of type 'number'\.?$/,
    explain: () =>
      `You're indexing into an array with something that isn't a number, which gives an implicit 'any'. ` +
      `Make sure the index is typed as 'number', or use a Record/Map if you need string keys.`,
  },
  {
    id: "object-literal-excess-properties",
    code: "TS2559",
    match: /Type '(.+)' has no properties in common with type '(.+)'\.?$/,
    explain: (m) =>
      `The object you're passing (type '${m[1]}') shares no properties with '${m[2]}'. ` +
      `This usually means you're passing the wrong object entirely, or the type definition has changed.`,
  },
  {
    id: "unused-ts-expect-error",
    code: "TS2578",
    match: /Unused '@ts-expect-error' directive\.?$/,
    explain: () =>
      `You have a '@ts-expect-error' comment but there's no error on the next line. ` +
      `Remove the comment since it's no longer needed — leaving it in can hide real errors in the future.`,
  },
  {
    id: "uninitialized-variable",
    code: "TS2448",
    match: /Block-scoped variable '(.+)' used before its declaration\.?$/,
    explain: (m) =>
      `'${m[1]}' is being used before it's declared. ` +
      `Move the declaration above the first use, or check for accidental variable shadowing.`,
  },
  {
    id: "type-arguments-not-allowed",
    code: "TS2347",
    match: /Unresolved type arguments are not permitted\.?|Type arguments cannot be used here\.?$/,
    explain: () =>
      `You're passing type arguments (the angle brackets '<...>') somewhere that doesn't accept them. ` +
      `Remove the type arguments, or check if you meant to call a generic function instead.`,
  },


  {
    id: "cannot-assign-to-const",
    code: "TS2588",
    match: /Cannot assign to '(.+)' because it is a constant\.?$/,
    explain: (m) =>
      `'${m[1]}' was declared with 'const' and cannot be reassigned. ` +
      `Use 'let' instead of 'const' if you need to reassign it, or restructure your logic to avoid the reassignment.`,
  },
  {
    id: "property-no-initializer",
    code: "TS2564",
    match: /Property '(.+)' has no initializer and is not definitely assigned in the constructor\.?$/,
    explain: (m) =>
      `'${m[1]}' is declared but never initialized. ` +
      `Either assign a value in the constructor, give it a default value, or mark it as optional ('${m[1]}?') or definitely assigned ('${m[1]}!').`,
  },
  {
    id: "object-is-unknown",
    code: "TS2571",
    match: /Object is of type 'unknown'\.?$/,
    explain: () =>
      `You're trying to use a value typed as 'unknown' without narrowing it first. ` +
      `Use a type guard (e.g. 'typeof value === "string"' or 'instanceof') to narrow the type before accessing properties or calling methods.`,
  },
  {
    id: "cannot-find-namespace",
    code: "TS2503",
    match: /Cannot find namespace '(.+)'\.?$/,
    explain: (m) =>
      `The namespace '${m[1]}' doesn't exist anywhere TypeScript can see. ` +
      `This usually means a missing @types package or a missing triple-slash reference. Try 'npm install --save-dev @types/${m[1].toLowerCase()}'.`,
  },
  {
    id: "class-incorrectly-implements-interface",
    code: "TS2420",
    match: /Class '(.+)' incorrectly implements interface '(.+)'\.?/,
    explain: (m) =>
      `'${m[1]}' claims to implement '${m[2]}' but is missing or incorrectly defining some required members. ` +
      `Check that all properties and methods defined in '${m[2]}' are present in '${m[1]}' with matching types.`,
  },
  {
    id: "function-implementation-missing",
    code: "TS2391",
    match: /Function implementation is missing or not immediately following the declaration\.?$/,
    explain: () =>
      `You've declared a function signature but haven't provided an implementation, or the implementation isn't directly after the overload signatures. ` +
      `Add the implementation body immediately after all overload declarations.`,
  },
  {
    id: "property-not-assignable-base-type",
    code: "TS2416",
    match: /Property '(.+)' in type '(.+)' is not assignable to the same property in base type '(.+)'\.?/,
    explain: (m) =>
      `'${m[2]}.${m[1]}' has a type that's incompatible with '${m[3]}.${m[1]}' from the base class or interface. ` +
      `The overriding type must be assignable to the base type — you can't widen the type when overriding.`,
  },
  {
    id: "abstract-member-not-implemented",
    code: "TS2515",
    match: /Non-abstract class '(.+)' does not implement all abstract members of '(.+)'\.?/,
    explain: (m) =>
      `'${m[1]}' extends an abstract class '${m[2]}' but hasn't implemented all of its abstract members. ` +
      `Add implementations for all abstract methods and properties, or mark '${m[1]}' as 'abstract' itself.`,
  },
  {
    id: "this-implicit-any",
    code: "TS2683",
    match: /'this' implicitly has type 'any' because it does not have a type annotation\.?$/,
    explain: () =>
      `TypeScript can't figure out what 'this' refers to in this context. ` +
      `Add a 'this' parameter as the first parameter of the function (e.g. 'function foo(this: MyClass)'), or use an arrow function to inherit 'this' from the surrounding scope.`,
  },
  {
    id: "type-instantiation-too-deep",
    code: "TS2589",
    match: /Type instantiation is excessively deep and possibly infinite\.?$/,
    explain: () =>
      `TypeScript hit a recursion limit while resolving your types — usually caused by a circular or deeply nested generic type. ` +
      `Simplify the type, add an explicit type annotation to break the inference chain, or restructure the generic to avoid deep recursion.`,
  },
  {
    id: "must-return-value",
    code: "TS2355",
    match: /A function whose declared type is neither 'void' nor 'any' must return a value\.?$/,
    explain: () =>
      `This function's return type says it should return a value, but it doesn't always do so. ` +
      `Make sure every code path returns the correct type, or change the return type to include 'void' or 'undefined' if returning nothing is intentional.`,
  },
  {
    id: "cannot-redeclare-variable",
    code: "TS2451",
    match: /Cannot redeclare block-scoped variable '(.+)'\.?$/,
    explain: (m) =>
      `'${m[1]}' has already been declared in this scope. ` +
      `You likely have two 'let' or 'const' declarations with the same name. Remove the duplicate or rename one of them.`,
  },
  {
    id: "variable-used-before-assigned",
    code: "TS2454",
    match: /Variable '(.+)' is used before being assigned\.?$/,
    explain: (m) =>
      `'${m[1]}' might not have been assigned a value by the time it's used. ` +
      `Make sure '${m[1]}' is initialized before use, or give it a default value when declaring it.`,
  },
  {
    id: "super-call-required",
    code: "TS2377",
    match: /Constructors for derived classes must contain a 'super' call\.?$/,
    explain: () =>
      `When a class extends another, its constructor must call 'super()' before accessing 'this'. ` +
      `Add a 'super()' call as the first statement in the constructor.`,
  },
  {
    id: "object-possibly-null-or-undefined",
    code: "TS2533",
    match: /Object is possibly 'null' or 'undefined'\.?$/,
    explain: () =>
      `This value could be either 'null' or 'undefined' at this point. ` +
      `Add a check (e.g. 'if (value != null)'), use optional chaining '?.', or use a non-null assertion '!' if you're certain it's defined.`,
  },
  {
    id: "extends-instead-of-implements",
    code: "TS2689",
    match: /Cannot extend an interface '(.+)'\.\s*Did you mean 'implements'\.?/,
    explain: (m) =>
      `You're using 'extends' on an interface in a class definition, but classes use 'implements' for interfaces. ` +
      `Change 'extends ${m[1]}' to 'implements ${m[1]}'.`,
  },
  {
    id: "import-path-ts-extension",
    code: "TS2691",
    match: /An import path cannot end with a '\.ts' extension\.?/,
    explain: () =>
      `Import paths should not include the '.ts' extension — TypeScript strips it during compilation. ` +
      `Remove the '.ts' from your import path, or use '.js' if you're targeting ESM output.`,
  },
  {
    id: "not-assignable-to-never",
    code: "TS2322",
    match: /Type '(.+)' is not assignable to type 'never'\.?$/,
    explain: (m) =>
      `'never' means a value that should be impossible, but you're trying to assign '${m[1]}' to it. ` +
      `This often appears in exhaustive switch/if checks — if you're adding a new case to a union type, make sure all branches are handled.`,
  },
  {
    id: "setter-return-value",
    code: "TS2408",
    match: /Setters cannot return a value\.?$/,
    explain: () =>
      `A 'set' accessor cannot return a value — setters always return 'void'. ` +
      `Remove the return statement from your setter.`,
  },
  {
    id: "destructor-null",
    code: "TS2759",
    match: /Cannot destructure property '(.+)' of '(.+)' as it is '(null|undefined)'\.?$/,
    explain: (m) =>
      `You're trying to destructure '${m[1]}' from '${m[2]}', but '${m[2]}' is '${m[3]}'. ` +
      `Add a null check before destructuring, or use a default value: 'const { ${m[1]} } = ${m[2]} ?? {}'.`,
  },

];
