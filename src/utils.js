import { ROOT_DOMAIN } from "./index";

export function redirectRootDomain(request) {
  const url = new URL(request.url);

  if (url.hostname !== ROOT_DOMAIN) {
    url.hostname = ROOT_DOMAIN;
    const urlString = url.toString();

    return new Response(`<a href="${urlString}">${urlString}</a>`, {
      status: 302,
      headers: { Location: urlString },
    });
  }
}

export function onlyRootDomain(request) {
  const url = new URL(request.url);

  if (url.hostname !== ROOT_DOMAIN) {
    return fetch(request);
  }
}

export async function queryDns(name, type) {
  const response = await fetch(
    `https://cloudflare-dns.com/dns-query?name=${name}&type=${type}`,
    { headers: { Accept: "application/dns-json" } }
  );

  return (await response.json()).Answer;
}

export function handleError(error) {
  return new Response(error.message || "Server Error", {
    status: error.status || 500,
  });
}
