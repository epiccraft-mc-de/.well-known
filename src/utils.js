import { ROOT_DOMAIN } from "./index";

export function redirectRootDomain(request) {
  const url = new URL(request.url);

  if (url.hostname !== ROOT_DOMAIN) {
    url.hostname = ROOT_DOMAIN;

    return redirect(url.toString());
  }
}

export function onlyRootDomain(request) {
  const url = new URL(request.url);

  if (url.hostname !== ROOT_DOMAIN) {
    return fetch(request);
  }
}

export function onlyDomain(request) {
  const url = new URL(request.url);

  if (!url.hostname.endsWith(ROOT_DOMAIN)) {
    url.hostname = ROOT_DOMAIN;

    return redirect(url);
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

export function redirect(url) {
  new Response(`Redirecting to <a href="${url}">${url}</a>...`, {
    status: 302,
    headers: { Location: url },
  });
}
