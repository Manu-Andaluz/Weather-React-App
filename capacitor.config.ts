import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'guardkey.test.starter',
  appName: 'GuardKey',
  webDir: 'www',
  server: {
    androidScheme: 'https',
  },
};

export default config;
