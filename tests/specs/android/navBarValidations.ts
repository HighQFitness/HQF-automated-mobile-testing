import { expect } from "chai";
import type { ChainablePromiseElement } from "webdriverio";

async function goHomeSafely() {
  console.log("Returning to Home page...");

  try {

    const backBtn = $('android=new UiSelector().descriptionContains("Back")');
    if (await backBtn.isExisting()) {
      console.log("Found Back button, clicking to exit modal...");
      await backBtn.click();
      await driver.pause(1500);
    }

    const homeNavBar = $('~Home_nav_bar');
    if (await homeNavBar.isExisting()) {
      await homeNavBar.click();
      console.log("Clicked Home nav bar");

      const homeIndicator = $('android=new UiSelector().text("Start workout")');
      await homeIndicator.waitForExist({ timeout: 10000 });
      console.log("Confirmed Home screen is fully loaded");
    } else {
      console.warn("Home_nav_bar not found, using driver.back() fallback.");
      await driver.back();
    }
  } catch (error) {
    console.warn("Could not navigate back to Home:", error);
  }
}

describe("Android App Navigation Tests", () => {
  afterEach(async () => {
    await goHomeSafely();
  });

  it("should open the app and verify Home page buttons", async () => {
    await driver.pause(3000);
    const homeNavBar = $('~Home_nav_bar');
    await homeNavBar.waitForExist({ timeout: 10000 });
    await homeNavBar.click();

    const startWorkoutButton = $('android=new UiSelector().text("Start workout")');
    await startWorkoutButton.waitForExist({ timeout: 10000 });
    expect(await startWorkoutButton.isDisplayed()).to.be.true;
  });

  it("should open the app and verify Devices page buttons", async () => {
    await driver.pause(3000);
    const devicesNavBar = $('~Devices_nav_bar');
    await devicesNavBar.waitForExist({ timeout: 10000 });
    await devicesNavBar.click();
    console.log("Navigated to Devices tab.");

    const addPillButton = $('android=new UiSelector().text("Add Pills")');
    await addPillButton.waitForExist({ timeout: 10000 });
    expect(await addPillButton.isDisplayed()).to.be.true;
  });

  it("should open the app and verify Feedback page buttons", async () => {
    await driver.pause(3000);
    const feedbackNavBar = $('~Feedback_nav_bar');
    await feedbackNavBar.waitForExist({ timeout: 10000 });
    await feedbackNavBar.click();
    console.log("Navigated to Feedback tab.");

    const bugReportButton = $('android=new UiSelector().text("Bug Report")');
    await bugReportButton.waitForExist({ timeout: 10000 });
    expect(await bugReportButton.isDisplayed()).to.be.true;

    const suggestionButton = $('android=new UiSelector().text("Suggestion for improvement")');
    await suggestionButton.waitForExist({ timeout: 10000 });
    expect(await suggestionButton.isDisplayed()).to.be.true;
  });
});
