import { queryDns } from "./utils";
import { ROOT_DOMAIN } from "./index";

export function matrixClient() {
  return new Response(
    `{"m.homeserver":{"base_url":"https://matrix.${ROOT_DOMAIN}"},"m.identity_server":{"base_url":"https://vector.im"}}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}

export async function matrixServer() {
  return new Response(
    `{"m.server":"matrix-federation.${ROOT_DOMAIN}:443"}` /*`{"m.server":"${await queryMatrixHost()}"}`*/,
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}

async function queryMatrixHost() {
  const dns = await queryDns(`_matrix._tcp.${ROOT_DOMAIN}`, "SRV");

  let data;

  for (let i = 0; i < dns.length; i++) {
    const [priority, _, port, domain] = dns[i].data.split(" ");
    if (!data || data.priority > priority) {
      data = { priority, domain, port };
    }
  }

  return `${data.domain}:${data.port}`;
}
