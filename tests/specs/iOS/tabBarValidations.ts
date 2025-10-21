import { expect } from "chai";

export async function goHomeSafely() {
  console.log("↩Returning to Home page...");

  try {
    const backBtn = $('-ios predicate string:name CONTAINS[c] "Back"');
    if (await backBtn.isExisting()) {
      console.log("Found Back button, clicking to exit modal...");
      await backBtn.click();
      await driver.pause(1500);
    }

    const homeButton = $('~Home');
    if (await homeButton.isExisting()) {
      await homeButton.click();
      console.log("Clicked Home tab button.");

      const homeIndicator = $('~Start workout');
      await homeIndicator.waitForExist({ timeout: 10000 });
      console.log("Confirmed Home screen fully loaded (Start workout visible).");
    } else {
      console.warn("Home tab not found, using driver.back() fallback.");
      await driver.back();
    }
  } catch (error) {
    console.warn("Could not navigate back to Home:", error);
  }
}


describe("iOS App Navigation Tests", () => {
  afterEach(async () => {
    await goHomeSafely();
  });

  it("should open the app and verify Home page buttons ", async () => {
    await driver.pause(2000);

    const homeButton = $('~Home');
    await homeButton.waitForExist({ timeout: 10000 });
    await homeButton.click();
    console.log("Clicked Home tab successfully");

    const startWorkoutButton = $('~Start workout');
    await startWorkoutButton.waitForExist({ timeout: 10000 });

    const isDisplayed = await startWorkoutButton.isDisplayed();
    expect(isDisplayed).to.be.true;
    console.log("Verified Start workout button is visible on Home page");
  });

  it("should open the app and verify Devices page buttons", async () => {
    const devicesButton = $('~Devices');
    await devicesButton.waitForExist({ timeout: 10000 });
    await devicesButton.click();
    console.log("Clicked Devices tab successfully");

    const addPillsButton = $('~Add pills');
    await addPillsButton.waitForExist({ timeout: 10000 });

    const isVisible = await addPillsButton.isDisplayed();
    expect(isVisible).to.be.true;
    console.log("Verified Add pills button is visible");
  });

  it("should open the app and verify Feedback page buttons", async () => {
    await driver.pause(2000);

    const feedbackButton = $('~Feedback');
    await feedbackButton.waitForExist({ timeout: 10000 });
    await feedbackButton.click();
    console.log("Clicked Feedback tab successfully");

    const bugReportButton = $('~Bug Report');
    await bugReportButton.waitForExist({ timeout: 10000 });

    const isBugReportVisible = await bugReportButton.isDisplayed();
    expect(isBugReportVisible).to.be.true;
    console.log("Verified Bug Report button is visible");

    const suggestionButton = $('~Suggestion for improvement');
    await suggestionButton.waitForExist({ timeout: 10000 });

    const isSuggestionVisible = await suggestionButton.isDisplayed();
    expect(isSuggestionVisible).to.be.true;
    console.log("Verified Suggestion for improvement button is visible");
  });
});
