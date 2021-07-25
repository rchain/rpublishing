import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "rfm",
  bundledWebRuntime: false,
  webDir: "build",
  plugins: {
    SplashScreen: {
      launchShowDuration: false
    }
  },
  cordova: {}
}
export default config;