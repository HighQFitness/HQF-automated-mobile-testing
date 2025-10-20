import { expect } from "chai";
import type { ChainablePromiseElement } from "webdriverio";

describe("Android App Launch", () => {

   afterEach(async () => {
    console.log("Returning to Home page...");

    try {
      const backBtn = $('android=new UiSelector().descriptionContains("Back")');
      if (await backBtn.isExisting()) {
        console.log("Found Back button, clicking it to exit modal...");
        await backBtn.click();
        await driver.pause(2000);
      }

      const homeNavBar = await $('~Home_nav_bar');
      await homeNavBar.waitForExist({ timeout: 10000 });

      if (await homeNavBar.isDisplayed()) {
        await homeNavBar.click();
        console.log("Returned to Home page.");
      } else {
        console.warn("Home_nav_bar not visible yet. Trying fallback navigation...");
        await driver.back();
      }
    } catch (error) {
      console.warn("Could not navigate back to Home:", error);
    }
  });

    it("should open the app and find Home in nav bar", async () => {
      await driver.pause(5000);

      const activity = await driver.getCurrentActivity();
      console.log("Current activity:", activity);

      const element: ChainablePromiseElement = $('~Home_nav_bar');

      await element.waitForExist({ timeout: 10000 });
      console.log("Found Home_nav_bar element!");
      await element.click();

      expect(await driver.getCurrentActivity()).to.not.be.empty;
      const startWorkoutButton = $('android=new UiSelector().text("Start workout")');

      await startWorkoutButton.waitForExist({ timeout: 10000 });
      console.log("Found Start workout button!");

      const isDisplayed = await startWorkoutButton.isDisplayed();
      expect(isDisplayed).to.be.true;  
    });

    it("should open the app and find Devices in nav bar", async () => {
      await driver.pause(3000);
      const activity = await driver.getCurrentActivity();
      console.log("Current activity:", activity);

          const element: ChainablePromiseElement = $('~Devices_nav_bar');  
      await element.click();

      expect(await driver.getCurrentActivity()).to.not.be.empty;

      const addPillButton = await $('android=new UiSelector().text("Add Pills")');

      await addPillButton.waitForExist({ timeout: 10000 });
      console.log("Found Add Pill button");

      const isDisplayed = await addPillButton.isDisplayed();
      expect(isDisplayed).to.be.true;
    });
});
