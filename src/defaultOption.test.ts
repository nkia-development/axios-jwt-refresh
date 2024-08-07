// defaultOption.test.js
import defaultOption from "./defaultOption";

describe("defaultOption", () => {
  test("should have statusCodes property with value [401]", () => {
    expect(defaultOption.statusCodes).toEqual([401]);
  });

  test("should have shouldRefresh property with value true", () => {
    expect(defaultOption.shouldRefresh).toBe(true);
  });

  test("should be an object", () => {
    expect(typeof defaultOption).toBe("object");
  });

  test("should have exactly two properties", () => {
    const keys = Object.keys(defaultOption);
    expect(keys.length).toBe(2);
  });
});
