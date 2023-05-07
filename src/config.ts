export const ROOT_DOMAIN = "epiccraft-mc.de.de";
export const MATRIX_CLIENT = `https://matrix.${ROOT_DOMAIN}`;
export const MATRIX_FEDERATION = `matrix.${ROOT_DOMAIN}:443`;

export const REDIRECT_DOMAINS = [
  `www.${ROOT_DOMAIN}`,
];

export const ROBOTS_EXCLUDE = [ // aka redirect to root
  `www.${ROOT_DOMAIN}`
];
