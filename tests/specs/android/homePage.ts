import { expect } from "chai";

describe("Android App Launch", () => {
  it("should open the app and find Home", async () => {
    const activity = await driver.getCurrentActivity();
    console.log("📱 Current activity:", activity);

    let element;
    element = await $('android=new UiSelector().text("Home")');
      await element.waitForExist({ timeout: 5000 });
      console.log("'Home' element found!");

    await element.click();
    console.log("👉 Clicked element successfully.");

    expect(await driver.getCurrentActivity()).to.not.be.empty;
  });
});
