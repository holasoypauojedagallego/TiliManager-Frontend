import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tilimanager.app',
  appName: 'TiliManager',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
