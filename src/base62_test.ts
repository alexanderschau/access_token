import { assertEquals } from "../test_deps.ts";
import { base62 } from "./base62.ts";

Deno.test("encode and decode number", () => {
  const n = 1048576;
  const x = base62.encode(n);
  assertEquals(base62.decode(x), n);
});

Deno.test("encode number", () => {
  assertEquals(base62.encode(262144), "16c8");
});

Deno.test("decode number", () => {
  assertEquals(base62.decode("16c8"), 262144);
});
