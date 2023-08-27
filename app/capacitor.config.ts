import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.cryptomime',
  appName: 'CryptoMime',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
