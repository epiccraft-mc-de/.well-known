import { ROOT_DOMAIN } from "./index";

export function securityTxt() {
  return new Response(
    `Contact: mailto:security@${ROOT_DOMAIN}
Expires: 2023-12-31T23:59:59.999Z
Preferred-Languages: en, de
Canonical: https://${ROOT_DOMAIN}/.well-known/security.txt`,
    {
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
