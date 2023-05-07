import {Router} from "itty-router";
import {robotsTxt, securityTxt} from "./other";
import {onlyDomain, onlyRootDomain, redirectRootDomain} from "./utils";
import {matrixClient, matrixServer} from "./matrix";

const router = Router()
  .get("/robots.txt", robotsTxt, redirectRootDomain)
  .get("/.well-known/security.txt", redirectRootDomain, securityTxt)
  .get("/.well-known/matrix/client", onlyDomain, onlyRootDomain, matrixClient)
  .get("/.well-known/matrix/server", onlyDomain, onlyRootDomain, matrixServer)
  .all("*", onlyDomain, fetch);

addEventListener("fetch", (event: FetchEvent) =>
  event.respondWith(
    router.handle(event.request).catch(
      (error: { message?: string; status?: number }) =>
        new Response(error.message || "Server Error", {
          status: error.status || 500,
        })
    )
  )
);
