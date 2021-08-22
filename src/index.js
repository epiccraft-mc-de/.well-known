import { Router } from "itty-router";
import { matrixClient, matrixServer } from "./matrix";
import { handleError, onlyRootDomain, redirectRootDomain } from "./utils";
import { securityTxt } from "./other";

export const ROOT_DOMAIN = "m4rc3l.de";

const router = Router()
  .get("/.well-known/security.txt", redirectRootDomain, securityTxt)
  .get("/.well-known/matrix/client", onlyRootDomain, matrixClient)
  .get("/.well-known/matrix/server", onlyRootDomain, matrixServer)
  .get("*", fetch);

addEventListener("fetch", (event) =>
  event.respondWith(router.handle(event.request).catch(handleError))
);
