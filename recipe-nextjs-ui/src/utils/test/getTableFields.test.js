import { getTableFields } from "../getTableFields";

describe("getTableFields", () => {
  test("returns names if array contains objects", () => {
    const data = [{ name: "John" }, { name: "Doe" }];
    expect(getTableFields(data)).toEqual(["John", "Doe"]);
  });

  test("returns original array if it contains primitives", () => {
    const data = ["A", "B", "C"];
    expect(getTableFields(data)).toEqual(["A", "B", "C"]);
  });

  test("returns the original data if it's not an array", () => {
    expect(getTableFields("test")).toBe("test");
  });
});
