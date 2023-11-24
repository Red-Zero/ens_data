import * as config from 'config';
const appConfig = { ...config };

console.log('appconfig:', JSON.stringify(config));
export function getConfig(key) {
  return appConfig[key];
}