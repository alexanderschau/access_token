# access_token

Random Token Generator for Deno 🦕 and the Browser.

## Example

```ts
import { accessToken } from "https://deno.land/x/access_token@VERSION/mod.ts";

// Create a new token
// accessToken.generate(prefix, secret?)
const token = accessToken.generate("mtt", "my_optional_secret");

// Validate a token
if (accessToken.validate(token, "my_optional_secret")) {
  console.log("Token is valid: ", token);
}

// Remove token from string (e.g. on Code Scanning)
const stringToCheck =
  "This is my token: xxx_1BpDK7DKPGCgc4EOmsq0mGIfw45XmS1ge36n.";
const stringWithoutToken = stringToCheck.replaceAll(
  accessToken.regExp,
  "SECRET_TOKEN",
);
console.log("After scanning:", stringWithoutToken);
```
## Format
This token generator is inspired by [GitHub new authentication token format](https://github.blog/2021-04-05-behind-githubs-new-authentication-token-formats/). It is easy to recognize (by humans and machines) and allows us to validate it, without the need to hit a database.