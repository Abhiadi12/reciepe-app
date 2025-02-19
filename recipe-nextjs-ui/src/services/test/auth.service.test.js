import { AUTH_URL } from "@/constants/authUrl.constant";
import { validQueries } from "@/utils/getQueryParams";
import {
  nonAuthenticatedAxios,
  authenticatedAxios,
} from "@/services/api.service";
import { login, signup, getProfile } from "../auth.service";

// Mock the axios instances
jest.mock("@/services/api.service", () => ({
  nonAuthenticatedAxios: {
    post: jest.fn(),
  },
  authenticatedAxios: {
    get: jest.fn(),
  },
}));

jest.mock("@/utils/getQueryParams", () => ({
  validQueries: jest.fn((q) => q),
}));

describe("Auth Service", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  test("login should call nonAuthenticatedAxios.post with correct parameters", async () => {
    const mockResponse = { data: { token: "fake-token" } };
    nonAuthenticatedAxios.post.mockResolvedValue(mockResponse);

    const email = "test@example.com";
    const password = "password123";

    const response = await login(email, password);

    expect(nonAuthenticatedAxios.post).toHaveBeenCalledWith(AUTH_URL.LOGIN, {
      email,
      password,
    });
    expect(response).toBe(mockResponse);
  });

  test("signup should call nonAuthenticatedAxios.post with correct parameters", async () => {
    const mockResponse = { data: { user: "test-user" } };
    nonAuthenticatedAxios.post.mockResolvedValue(mockResponse);

    const username = "testUser";
    const email = "test@example.com";
    const password = "password123";

    const response = await signup(username, email, password);

    expect(nonAuthenticatedAxios.post).toHaveBeenCalledWith(AUTH_URL.SIGNUP, {
      username,
      email,
      password,
    });
    expect(response).toBe(mockResponse);
  });

  test("getProfile should call authenticatedAxios.get with correct URL and params", async () => {
    const mockResponse = { data: { id: "123", name: "John Doe" } };
    authenticatedAxios.get.mockResolvedValue(mockResponse);

    const id = "123";
    const queries = { sort: "desc" };

    const response = await getProfile(id, queries);

    expect(authenticatedAxios.get).toHaveBeenCalledWith(
      AUTH_URL.PROFILE.replace(":id", id),
      { params: queries },
    );
    expect(response).toBe(mockResponse);
  });
});
