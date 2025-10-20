import { expect } from "chai";

describe("Android App Launch", () => {
  it("should open the app and find Home or Login", async () => {
    const activity = await driver.getCurrentActivity();
    console.log("📱 Current activity:", activity);

    let element;

    try {
      console.log("🔍 Looking for 'Home' element...");
      element = await $('android=new UiSelector().text("Home")');
      await element.waitForExist({ timeout: 5000 });
      console.log("✅ 'Home' element found!");
    } catch {
      console.warn("⚠️ Could not find 'Home' — trying 'Login' instead...");
      element = await $('android=new UiSelector().text("Login")');
      await element.waitForExist({ timeout: 5000 });
      console.log("✅ 'Login' element found!");
    }

    await element.click();
    console.log("👉 Clicked element successfully.");

    expect(await driver.getCurrentActivity()).to.not.be.empty;
  });
});
