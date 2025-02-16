import { validQueries } from "../getQueryParams";

describe("getQueryParams", () => {
  test("removes null and undefined values", () => {
    expect(validQueries({ name: "John", age: null, city: undefined })).toEqual({
      name: "John",
    });
  });

  test("converts arrays to comma-separated strings", () => {
    expect(validQueries({ tags: ["react", "nextjs"] })).toEqual({
      tags: "react,nextjs",
    });
  });
});
