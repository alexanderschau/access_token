import { base62 } from "./base62.ts";
import { crc32 } from "./crc32.ts";

export const accessToken = {
  randBase62: () =>
    //@ts-ignore : typescript sometimes doesn't recognize 'crypto.randomUUID()'
    base62.encode(parseInt(crypto.randomUUID().replaceAll("-", ""), 16)),
  genChecksum: (data: string) =>
    ("000000" + crc32.buildBase62(data)).slice(
      -6,
    ),
  generate: (prefix: string, secret?: string): string => {
    if (prefix.length != 3) return "";
    const firstPart = prefix + "_" +
      (accessToken.randBase62() + accessToken.randBase62()).substring(0, 30);
    const checksum = accessToken.genChecksum(
      firstPart + (secret || ""),
    );
    return firstPart + checksum;
  },
  validate: (token: string, secret?: string): boolean => {
    const regExpCheck = token.match(accessToken.regExp);
    if (!regExpCheck || regExpCheck[0] !== token) return false;
    return token.slice(-6) ==
      accessToken.genChecksum(token.substr(0, 34) + (secret || ""));
  },
  regExp:
    /([abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ]{3})_([0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ]{30})([0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ]{6})/g,
};
