import { assertEquals } from "../test_deps.ts";
import { accessToken, accessTokenRegExp } from "./access_token.ts";

Deno.test("token length", () => {
  assertEquals(accessToken.generate("xxx").length, 40);
});

Deno.test("correct prefix", () => {
  assertEquals(accessToken.generate("xxx").substring(0, 3), "xxx");
});

Deno.test("validation", () => {
  const secret = "test_secret";
  if (!accessToken.validate(accessToken.generate("xxx", secret), secret)) {
    throw Error("vaildation failed");
  }
});

Deno.test("validate invalid token", () => {
  if (accessToken.validate("invalid_token")) {
    throw Error("wrong validation");
  }
});

Deno.test("check regexp", () => {
  if (
    !"xxx_1BpDK7DKPGCgc4EOmsq0mGIfw45XmS1ge36n".match(accessTokenRegExp) ||
    "x0x_1BpDK7DKPGCgc4EOmsq0mGIfw45XmS1ge36n".match(accessTokenRegExp) ||
    "xxx_1BpDK7DKPGCgc4EOmsq0mGIfaw45XmS1ge36n".match(accessTokenRegExp) ||
    "xxx_1BpDK7DKPGCgc4EOmsq0_GIfw45XmS1ge36n".match(accessTokenRegExp)
  ) {
    throw Error("regexp doesn't work");
  }
});
