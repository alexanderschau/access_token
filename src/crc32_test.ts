import { assertEquals } from "../test_deps.ts";
import { crc32 } from "./crc32.ts";

Deno.test("get checksum of string", () => {
  const text = "hello world";
  assertEquals(crc32.build(text), 222957957);
});

Deno.test("get base62 checksum of string", () => {
  const text = "hello world";
  assertEquals(crc32.buildBase62(text), "f5vy5");
});
