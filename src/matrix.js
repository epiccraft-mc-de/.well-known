import { queryDns } from "./utils";
import { MATRIX_CLIENT, MATRIX_FEDERATION, ROOT_DOMAIN } from "./index";
import {
  ACCESS_CONTROL_ALLOW_ORIGIN,
  APPLICATION_JSON,
  ASTERISK,
  CONTENT_TYPE,
} from "./headers";

export function matrixClient() {
  return new Response(
    `{"m.homeserver":{"base_url":"${MATRIX_CLIENT}"},"m.identity_server":{"base_url":"https://vector.im"}}`,
    {
      headers: {
        [CONTENT_TYPE]: APPLICATION_JSON,
        [ACCESS_CONTROL_ALLOW_ORIGIN]: ASTERISK,
      },
    }
  );
}

export async function matrixServer() {
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
