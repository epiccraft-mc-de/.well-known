import {MATRIX_CLIENT, MATRIX_FEDERATION, ROOT_DOMAIN} from "./config";
import {ACCESS_CONTROL_ALLOW_ORIGIN, APPLICATION_JSON, ASTERISK, CONTENT_TYPE} from "./headers";
import {queryDns} from "./utils";

export function matrixClient(): Response {
  return new Response(
    `{"m.homeserver":{"base_url":"${MATRIX_CLIENT}"}}`,
    {
      headers: {
        [CONTENT_TYPE]: APPLICATION_JSON,
        [ACCESS_CONTROL_ALLOW_ORIGIN]: ASTERISK,
      },
    }
  );
}

export function matrixServer(): Response {
  return new Response(
    `{"m.server":"${MATRIX_FEDERATION}"}` /*`{"m.server":"${await queryMatrixHost()}"}`*/,
    {
      headers: {
        [CONTENT_TYPE]: APPLICATION_JSON,
        [ACCESS_CONTROL_ALLOW_ORIGIN]: ASTERISK,
      },
    }
  );
}

async function queryMatrixHost(): Promise<string | null> {
  const dns = await queryDns(`_matrix._tcp.${ROOT_DOMAIN}`, "SRV");

  let data: { priority: number; domain: string; port: number } | null = null;

  for (let i = 0; i < dns.length; i++) {
    let [priority0, _, port, domain] = dns[i].data.split(" ");
    const priority = Number(priority0);

    if (!data || data.priority > priority) {
      data = {priority, domain, port: Number(port)};
    }
  }

  if (!data) {
    return null;
  }

  return `${data.domain}:${data.port}`;
}
