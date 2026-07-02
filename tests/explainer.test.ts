import { describe, it, expect } from "vitest";
import { explainDiagnostic } from "../src/explainer.js";

describe("explainDiagnostic", () => {
  it("explains a known pattern (TS2322)", () => {
    const result = explainDiagnostic({
      file: "a.ts",
      line: 1,
      column: 1,
      code: "TS2322",
      rawMessage: "Type 'string' is not assignable to type 'number'.",
    });
    expect(result.matchedPatternId).toBe("type-not-assignable");
    expect(result.explanation).toContain("string");
    expect(result.explanation).toContain("number");
  });

  it("falls back to raw message for unknown codes", () => {
    const result = explainDiagnostic({
      file: "a.ts",
      line: 1,
      column: 1,
      code: "TS9999",
      rawMessage: "Some made up error.",
    });
    expect(result.matchedPatternId).toBeNull();
    expect(result.explanation).toBe("Some made up error.");
  });

  it("explains TS2531 (object possibly null)", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2531",
      rawMessage: "Object is possibly 'null'.",
    });
    expect(result.matchedPatternId).toBe("object-possibly-null");
    expect(result.explanation).toContain("null");
  });

  it("explains TS2741 (missing required property)", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2741",
      rawMessage: "Property 'id' is missing in type '{ name: string; }' but required in type 'User'.",
    });
    expect(result.matchedPatternId).toBe("missing-required-properties");
    expect(result.explanation).toContain("id");
  });

  it("explains TS2554 (wrong argument count)", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2554",
      rawMessage: "Expected 2 arguments, but got 1.",
    });
    expect(result.matchedPatternId).toBe("wrong-argument-count");
    expect(result.explanation).toContain("2 argument");
  });

  it("explains TS7006 (implicit any parameter)", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS7006",
      rawMessage: "Parameter 'x' implicitly has an 'any' type.",
    });
    expect(result.matchedPatternId).toBe("implicit-any-parameter");
    expect(result.explanation).toContain("x");
  });

  it("explains TS2769 (no overload matches)", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2769",
      rawMessage: "No overload matches this call.",
    });
    expect(result.matchedPatternId).toBe("no-overload-matches");
    expect(result.explanation).toContain("overload");
  });

  it("explains TS2551 (did you mean)", () => {
    const result = explainDiagnostic({ file: "a.ts", line: 1, column: 1, code: "TS2551", rawMessage: "Property 'naem' does not exist on type 'User'. Did you mean 'name'?" });
    expect(result.matchedPatternId).toBe("did-you-mean");
    expect(result.explanation).toContain("name");
  });

  it("explains TS2349 (not callable)", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2349",
      rawMessage: "This expression is not callable.",
    });
    expect(result.matchedPatternId).toBe("not-callable");
    expect(result.explanation).toContain("function");
  });

  it("explains TS2532 (possibly undefined access)", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2532",
      rawMessage: "Object is possibly 'undefined'.",
    });
    expect(result.matchedPatternId).toBe("possibly-undefined-access");
    expect(result.explanation).toContain("undefined");
  });

  it("explains TS2540 (readonly cannot assign)", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2540",
      rawMessage: "Cannot assign to 'id' because it is a read-only property.",
    });
    expect(result.matchedPatternId).toBe("readonly-cannot-assign");
    expect(result.explanation).toContain("id");
  });

  it("explains TS2307 (cannot find module)", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2307",
      rawMessage: "Cannot find module 'lodash' or its corresponding type declarations.",
    });
    expect(result.matchedPatternId).toBe("cannot-find-module");
    expect(result.explanation).toContain("lodash");
  });

  it("explains TS7053 (no index signature)", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS7053",
      rawMessage: "Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ a: number; }'.",
    });
    expect(result.matchedPatternId).toBe("type-has-no-index-signature");
    expect(result.explanation).toContain("index");
  });

  it("explains TS2367 (union not narrowed)", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2367",
      rawMessage: "This condition will always return 'false' since the types 'string' and 'number' have no overlap.",
    });
    expect(result.matchedPatternId).toBe("union-not-narrowed");
    expect(result.explanation).toContain("never be equal");
  });

  it("explains TS2366 (missing return type)", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2366",
      rawMessage: "Function lacks ending return statement and return type does not include 'undefined'.",
    });
    expect(result.matchedPatternId).toBe("missing-return-type");
    expect(result.explanation).toContain("return");
  });

  it("explains TS2511 (abstract class instantiation)", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2511",
      rawMessage: "Cannot create an instance of an abstract class.",
    });
    expect(result.matchedPatternId).toBe("abstract-class-instantiation");
    expect(result.explanation).toContain("abstract");
  });

  it("explains TS2352 (conversion may be a mistake)", () => {
    const result = explainDiagnostic({
      file: "a.ts", line: 1, column: 1, code: "TS2352",
      rawMessage: "Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other.",
    });
    expect(result.matchedPatternId).toBe("conversion-may-be-mistake");
    expect(result.explanation).toContain("string");
  });
});
describe("explainDiagnostic - batch 4 patterns", () => {
  it("explains TS6133 (unused variable)", () => {
    const result = explainDiagnostic({ file: "a.ts", line: 1, column: 1, code: "TS6133",
      rawMessage: "'count' is declared but its value is never read." });
    expect(result.matchedPatternId).toBe("unused-variable");
    expect(result.explanation).toContain("count");
  });

  it("explains TS2614 (no exported member)", () => {
    const result = explainDiagnostic({ file: "a.ts", line: 1, column: 1, code: "TS2614",
      rawMessage: "Module 'lodash' has no exported member 'flatMap'." });
    expect(result.matchedPatternId).toBe("no-exported-member");
    expect(result.explanation).toContain("flatMap");
  });

  it("explains TS2693 (type used as value)", () => {
    const result = explainDiagnostic({ file: "a.ts", line: 1, column: 1, code: "TS2693",
      rawMessage: "'User' only refers to a type, but is being used as a value here." });
    expect(result.matchedPatternId).toBe("type-used-as-value");
    expect(result.explanation).toContain("User");
  });

  it("explains TS2722 (cannot invoke possibly undefined)", () => {
    const result = explainDiagnostic({ file: "a.ts", line: 1, column: 1, code: "TS2722",
      rawMessage: "Cannot invoke an object which is possibly 'undefined'." });
    expect(result.matchedPatternId).toBe("cannot-invoke-possibly-undefined");
    expect(result.explanation).toContain("fn?.()");
  });

  it("explains TS4114 (override keyword required)", () => {
    const result = explainDiagnostic({ file: "a.ts", line: 1, column: 1, code: "TS4114",
      rawMessage: "This member must have an 'override' modifier because it overrides a member in the base class 'Animal'." });
    expect(result.matchedPatternId).toBe("override-keyword-required");
    expect(result.explanation).toContain("Animal");
  });

  it("explains TS7015 (array implicit any)", () => {
    const result = explainDiagnostic({ file: "a.ts", line: 1, column: 1, code: "TS7015",
      rawMessage: "Element implicitly has an 'any' type because index expression is not of type 'number'." });
    expect(result.matchedPatternId).toBe("array-implicit-any");
    expect(result.explanation).toContain("number");
  });

  it("explains TS2559 (no common properties)", () => {
    const result = explainDiagnostic({ file: "a.ts", line: 1, column: 1, code: "TS2559",
      rawMessage: "Type '{ foo: string; }' has no properties in common with type 'User'." });
    expect(result.matchedPatternId).toBe("object-literal-excess-properties");
    expect(result.explanation).toContain("User");
  });

  it("explains TS2578 (unused ts-expect-error)", () => {
    const result = explainDiagnostic({ file: "a.ts", line: 1, column: 1, code: "TS2578",
      rawMessage: "Unused '@ts-expect-error' directive." });
    expect(result.matchedPatternId).toBe("unused-ts-expect-error");
    expect(result.explanation).toContain("@ts-expect-error");
  });

  it("explains TS2448 (uninitialized variable)", () => {
    const result = explainDiagnostic({ file: "a.ts", line: 1, column: 1, code: "TS2448",
      rawMessage: "Block-scoped variable 'x' used before its declaration." });
    expect(result.matchedPatternId).toBe("uninitialized-variable");
    expect(result.explanation).toContain("x");
  });

  it("explains TS2347 (type arguments not allowed)", () => {
    const result = explainDiagnostic({ file: "a.ts", line: 1, column: 1, code: "TS2347",
      rawMessage: "Unresolved type arguments are not permitted." });
    expect(result.matchedPatternId).toBe("type-arguments-not-allowed");
    expect(result.explanation).toContain("type arguments");
  });
});

describe("batch 5a - TS2588, TS2564, TS2571, TS2503, TS2420", () => {
  it("explains TS2588 (cannot assign to const)", () => {
    const result = explainDiagnostic({ file: "a.ts", line: 1, column: 1, code: "TS2588",
      rawMessage: "Cannot assign to 'MAX' because it is a constant." });
    expect(result.matchedPatternId).toBe("cannot-assign-to-const");
    expect(result.explanation).toContain("MAX");
  });
  it("explains TS2564 (property no initializer)", () => {
    const result = explainDiagnostic({ file: "a.ts", line: 1, column: 1, code: "TS2564",
      rawMessage: "Property 'name' has no initializer and is not definitely assigned in the constructor." });
    expect(result.matchedPatternId).toBe("property-no-initializer");
    expect(result.explanation).toContain("name");
  });
  it("explains TS2571 (object is unknown)", () => {
    const result = explainDiagnostic({ file: "a.ts", line: 1, column: 1, code: "TS2571",
      rawMessage: "Object is of type 'unknown'." });
    expect(result.matchedPatternId).toBe("object-is-unknown");
    expect(result.explanation).toContain("unknown");
  });
  it("explains TS2503 (cannot find namespace)", () => {
    const result = explainDiagnostic({ file: "a.ts", line: 1, column: 1, code: "TS2503",
      rawMessage: "Cannot find namespace 'NodeJS'." });
    expect(result.matchedPatternId).toBe("cannot-find-namespace");
    expect(result.explanation).toContain("NodeJS");
  });
  it("explains TS2420 (class incorrectly implements interface)", () => {
    const result = explainDiagnostic({ file: "a.ts", line: 1, column: 1, code: "TS2420",
      rawMessage: "Class 'Dog' incorrectly implements interface 'Animal'." });
    expect(result.matchedPatternId).toBe("class-incorrectly-implements-interface");
    expect(result.explanation).toContain("Dog");
  });
});

describe("batch 5b - TS2391, TS2416, TS2515, TS2683, TS2589", () => {
  it("explains TS2391 (function implementation missing)", () => {
    const result = explainDiagnostic({ file: "a.ts", line: 1, column: 1, code: "TS2391",
      rawMessage: "Function implementation is missing or not immediately following the declaration." });
    expect(result.matchedPatternId).toBe("function-implementation-missing");
    expect(result.explanation).toContain("implementation");
  });
  it("explains TS2416 (property not assignable base type)", () => {
    const result = explainDiagnostic({ file: "a.ts", line: 1, column: 1, code: "TS2416",
      rawMessage: "Property 'name' in type 'Dog' is not assignable to the same property in base type 'Animal'." });
    expect(result.matchedPatternId).toBe("property-not-assignable-base-type");
    expect(result.explanation).toContain("Dog");
  });
  it("explains TS2515 (abstract member not implemented)", () => {
    const result = explainDiagnostic({ file: "a.ts", line: 1, column: 1, code: "TS2515",
      rawMessage: "Non-abstract class 'Cat' does not implement all abstract members of 'Animal'." });
    expect(result.matchedPatternId).toBe("abstract-member-not-implemented");
    expect(result.explanation).toContain("Cat");
  });
  it("explains TS2683 (this implicit any)", () => {
    const result = explainDiagnostic({ file: "a.ts", line: 1, column: 1, code: "TS2683",
      rawMessage: "'this' implicitly has type 'any' because it does not have a type annotation." });
    expect(result.matchedPatternId).toBe("this-implicit-any");
    expect(result.explanation).toContain("this");
  });
  it("explains TS2589 (type instantiation too deep)", () => {
    const result = explainDiagnostic({ file: "a.ts", line: 1, column: 1, code: "TS2589",
      rawMessage: "Type instantiation is excessively deep and possibly infinite." });
    expect(result.matchedPatternId).toBe("type-instantiation-too-deep");
    expect(result.explanation).toContain("recursion");
  });
});

describe("batch 5c - TS2355, TS2451, TS2454, TS2377, TS2533", () => {
  it("explains TS2355 (must return value)", () => {
    const result = explainDiagnostic({ file: "a.ts", line: 1, column: 1, code: "TS2355",
      rawMessage: "A function whose declared type is neither 'void' nor 'any' must return a value." });
    expect(result.matchedPatternId).toBe("must-return-value");
    expect(result.explanation).toContain("return");
  });
  it("explains TS2451 (cannot redeclare variable)", () => {
    const result = explainDiagnostic({ file: "a.ts", line: 1, column: 1, code: "TS2451",
      rawMessage: "Cannot redeclare block-scoped variable 'count'." });
    expect(result.matchedPatternId).toBe("cannot-redeclare-variable");
    expect(result.explanation).toContain("count");
  });
  it("explains TS2454 (variable used before assigned)", () => {
    const result = explainDiagnostic({ file: "a.ts", line: 1, column: 1, code: "TS2454",
      rawMessage: "Variable 'result' is used before being assigned." });
    expect(result.matchedPatternId).toBe("variable-used-before-assigned");
    expect(result.explanation).toContain("result");
  });
  it("explains TS2377 (super call required)", () => {
    const result = explainDiagnostic({ file: "a.ts", line: 1, column: 1, code: "TS2377",
      rawMessage: "Constructors for derived classes must contain a 'super' call." });
    expect(result.matchedPatternId).toBe("super-call-required");
    expect(result.explanation).toContain("super()");
  });
  it("explains TS2533 (object possibly null or undefined)", () => {
    const result = explainDiagnostic({ file: "a.ts", line: 1, column: 1, code: "TS2533",
      rawMessage: "Object is possibly 'null' or 'undefined'." });
    expect(result.matchedPatternId).toBe("object-possibly-null-or-undefined");
    expect(result.explanation).toContain("null");
  });
});

describe("batch 5d - TS2689, TS2691, TS2408, TS2759", () => {
  it("explains TS2689 (extends instead of implements)", () => {
    const result = explainDiagnostic({ file: "a.ts", line: 1, column: 1, code: "TS2689",
      rawMessage: "Cannot extend an interface 'Serializable'. Did you mean 'implements'?" });
    expect(result.matchedPatternId).toBe("extends-instead-of-implements");
    expect(result.explanation).toContain("implements");
  });
  it("explains TS2691 (import path ts extension)", () => {
    const result = explainDiagnostic({ file: "a.ts", line: 1, column: 1, code: "TS2691",
      rawMessage: "An import path cannot end with a '.ts' extension." });
    expect(result.matchedPatternId).toBe("import-path-ts-extension");
    expect(result.explanation).toContain(".ts");
  });
  it("explains TS2408 (setter return value)", () => {
    const result = explainDiagnostic({ file: "a.ts", line: 1, column: 1, code: "TS2408",
      rawMessage: "Setters cannot return a value." });
    expect(result.matchedPatternId).toBe("setter-return-value");
    expect(result.explanation).toContain("setter");
  });
  it("explains TS2759 (destructure null)", () => {
    const result = explainDiagnostic({ file: "a.ts", line: 1, column: 1, code: "TS2759",
      rawMessage: "Cannot destructure property 'name' of 'user' as it is 'null'." });
    expect(result.matchedPatternId).toBe("destructor-null");
    expect(result.explanation).toContain("name");
  });
});
