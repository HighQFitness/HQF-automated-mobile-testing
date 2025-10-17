import { remote } from "webdriverio";

async function main() {
  const opts = {
    protocol: "http",
    hostname: "127.0.0.1",
    port: 4723,
    path: "/",
    capabilities: {
      platformName: "Android",
      "appium:deviceName": "Medium_Phone_API_36.1", 
      "appium:platformVersion": "15",               
      "appium:automationName": "UiAutomator2",
      "appium:app": "/Users/jimenanemina/Repos/highQFitness/HQF-android-ios/android/app-mobile/build/intermediates/apk/dev/debug/app-mobile-dev-debug.apk",
      "appium:avd": "Medium_Phone_API_36.1",
      "appium:noReset": true
    },
  };

  const driver = await remote(opts);
  console.log("✅ Android app launched successfully!");
  await driver.deleteSession();
}

main().catch(console.error);
