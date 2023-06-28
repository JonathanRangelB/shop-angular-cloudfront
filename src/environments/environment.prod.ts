import { Config } from './config.interface';

export const environment: Config = {
  production: true,
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
