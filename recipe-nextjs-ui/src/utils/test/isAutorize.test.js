const { isAuthorize } = require("../isAuthorize");

describe("isAuthorize", () => {
  test("returns true if currentUserId matches ownerId", () => {
    expect(isAuthorize(1, 1)).toBe(true);
  });

  test("returns false if currentUserId does not match ownerId", () => {
    expect(isAuthorize(1, 2)).toBe(false);
  });
});
