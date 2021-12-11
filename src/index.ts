import { Router } from "itty-router";
import { robotsTxt, securityTxt } from "./other";
import { onlyDomain, onlyRootDomain, redirectRootDomain } from "./utils";
import { matrixClient, matrixServer } from "./matrix";

export const ROOT_DOMAIN = "m4rc3l.de";
export const MATRIX_CLIENT = `https://matrix.${ROOT_DOMAIN}`;
export const MATRIX_FEDERATION = `matrix-federation.${ROOT_DOMAIN}:443`;

export const REDIRECT_DOMAINS = [
  `www.${ROOT_DOMAIN}`,
  "marcelcoding.ml",
  "www.marcelcoding.ml",
  "marcelcoding.tk",
  "www.marcelcoding.tk",
];

const router = Router()
  .get("/robots.txt", robotsTxt)
  .get("/.well-known/security.txt", redirectRootDomain, securityTxt)
  .get("/.well-known/matrix/client", onlyDomain, onlyRootDomain, matrixClient)
  .get("/.well-known/matrix/server", onlyDomain, onlyRootDomain, matrixServer)
  .all("*", onlyDomain, fetch);

addEventListener("fetch", (event) =>
  event.respondWith(
    router.handle(event.request).catch(
      (error: { message?: string; status?: number }) =>
        new Response(error.message || "Server Error", {
          status: error.status || 500,
        })
    )
  )
);
