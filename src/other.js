export function securityTxt() {
  return new Response(
    `Contact: mailto:security@m4rc3l.de
Expires: 2023-12-31T23:59:59.999Z
Preferred-Languages: en, de
Canonical: https://m4rc3l.de/.well-known/security.txt`,
    {
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
