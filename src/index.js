import { Router } from "itty-router";
import { handleError, onlyRootDomain, redirectRootDomain } from "./utils";
import { matrixClient, matrixServer } from "./matrix";
import { robotsTxt, securityTxt } from "./other";

export const ROOT_DOMAIN = "m4rc3l.de";
export const MATRIX_CLIENT = `https://matrix.${ROOT_DOMAIN}`;
export const MATRIX_FEDERATION = `matrix-federation-int.${ROOT_DOMAIN}:443`;

const router = Router()
  .get("/robots.txt", robotsTxt)
  .get("/.well-known/security.txt", redirectRootDomain, securityTxt)
  .get("/.well-known/matrix/client", onlyRootDomain, matrixClient)
  .get("/.well-known/matrix/server", onlyRootDomain, matrixServer)
  .all("*", fetch);

addEventListener("fetch", (event) => {
  event.respondWith(router.handle(event.request).catch(handleError));
});
