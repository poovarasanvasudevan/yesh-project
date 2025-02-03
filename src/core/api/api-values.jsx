

const URLS = {
  dev : "",
  sit : "",
  uat : "",
}

export const getBaseURL = (env) => {
  return URLS[env];
}