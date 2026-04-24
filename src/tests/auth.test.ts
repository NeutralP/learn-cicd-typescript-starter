import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth.js";

describe("getAPIKey", () => {
  test("returns null when no authorization header is present", () => {
    expect(getAPIKey({})).toBeNull();
  });

  test("returns null when authorization header is empty string", () => {
    expect(getAPIKey({ authorization: "" })).toBeNull();
  });

  test("returns null when scheme is not ApiKey", () => {
    expect(getAPIKey({ authorization: "Bearer sometoken" })).toBeNull();
  });

  test("returns null when header has no token after scheme", () => {
    expect(getAPIKey({ authorization: "ApiKey" })).toBeNull();
  });

  test("returns the API key when header is valid", () => {
    expect(getAPIKey({ authorization: "ApiKey my-secret-key" })).toBe("my-secret-key");
  });

  test("scheme matching is case-sensitive", () => {
    expect(getAPIKey({ authorization: "apikey my-secret-key" })).toBeNull();
    expect(getAPIKey({ authorization: "APIKEY my-secret-key" })).toBeNull();
  });
});
