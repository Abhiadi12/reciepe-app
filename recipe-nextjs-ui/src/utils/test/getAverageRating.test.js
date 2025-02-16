import { getAverageRating } from "../getAverageRating";

describe("getAverageRating", () => {
  test("returns 0 if ratings array is empty or undefined", () => {
    expect(getAverageRating([])).toBe(0);
    expect(getAverageRating(null)).toBe(0);
    expect(getAverageRating(undefined)).toBe(0);
  });

  test("calculates the correct average rating", () => {
    const ratings = [{ score: 4 }, { score: 5 }, { score: 3 }];
    expect(getAverageRating(ratings)).toBe("4.0");
  });
});
