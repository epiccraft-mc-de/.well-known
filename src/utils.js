export async function requireRootDomain(request) {
  const url = new URL(request.url);

  if (url.hostname !== "m4rc3l.de") {
    url.hostname = "m4rc3l.de";
    const urlString = url.toString();

    return new Response(`<a href="${urlString}">${urlString}</a>`, {
      status: 302,
      headers: { Location: urlString },
    });
  }
}

export async function queryDns(name, type) {
  const response = await fetch(
    `https://cloudflare-dns.com/dns-query?name=${name}&type=${type}`,
    { headers: { Accept: "application/dns-json" } }
  );

  return (await response.json()).Answer;
}
