

const URLS = {
  prod: 'https://9gw2c50g75-vpce-076e779fef63877dd.execute-api.us-east-2.amazonaws.com/dev/',
  dev: 'https://9gw2c50g75-vpce-076e779fef63877dd.execute-api.us-east-2.amazonaws.com/dev/',
  sit: 'https://9gw2c50g75-vpce-076e779fef63877dd.execute-api.us-east-2.amazonaws.com/dev/',
  uat: 'https://t53pqfcoge-vpce-0bb6773aa19f6c94f.execute-api.us-east-1.amazonaws.com/preprod/',
}

export const getBaseURL = (env) => {
  return URLS[env];
}