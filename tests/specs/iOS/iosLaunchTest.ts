import { remote } from "webdriverio";

async function main() {
  const opts = {
    protocol: "http",
    hostname: "127.0.0.1",
    port: 4723,
    path: "/",              // Appium 3 base path
    capabilities: {
      platformName: "iOS",
      "appium:deviceName": "iPhone 17",
      "appium:platformVersion": "26.0",
      "appium:automationName": "XCUITest",
      "appium:app": "/Users/jimenanemina/Library/Developer/Xcode/DerivedData/HiQFitness-ffzzmvguetpesgdqgwbjrebktwpl/Build/Products/Debug-iphonesimulator/HiQFitness.app"
    },
  };

  const driver = await remote(opts);

  console.log("✅ Session started");
  await driver.deleteSession();
  console.log("🧹 Session closed");
}

main().catch(console.error);
