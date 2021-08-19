import { Router } from "itty-router";
import { matrixClient, matrixServer } from "./matrix";
import { requireRootDomain } from "./utils";
import { securityTxt } from "./other";

const router = Router()
  .get("/.well-known/security.txt", requireRootDomain, securityTxt)
  .get("/.well-known/matrix/client", requireRootDomain, matrixClient)
  .get("/.well-known/matrix/server", requireRootDomain, matrixServer)
  .get("*", (request) => fetch(request));

addEventListener("fetch", (event) =>
  event.respondWith(
    router.handle(event.request).catch(
      (error) =>
        new Response(error.message || "Server Error", {
          status: error.status || 500,
        })
    )
  )
);
