// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Config } from './config.interface';

export const environment: Config = {
  production: false,
  apiEndpoints: {
    product: 'https://k74k9eskp6.execute-api.us-east-2.amazonaws.com',
    order: 'https://k74k9eskp6.execute-api.us-east-2.amazonaws.com',
    import: 'https://k74k9eskp6.execute-api.us-east-2.amazonaws.com',
    bff: 'https://k74k9eskp6.execute-api.us-east-2.amazonaws.com',
    cart: 'https://k74k9eskp6.execute-api.us-east-2.amazonaws.com',
  },
  apiEndpointsEnabled: {
    product: true,
    order: false,
    import: true,
    bff: true,
    cart: false,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
