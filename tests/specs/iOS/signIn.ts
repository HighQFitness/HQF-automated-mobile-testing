import { expect } from "chai";
import { browser } from "@wdio/globals";

before(async () => {
    console.log(browser.capabilities);
 });

describe("iOS Phone Verification Flow", () => {
  it("should clear fields, enter phone number, and tap Get code", async () => {
    const textFields = await $$('XCUIElementTypeTextField');
    const countryCodeField = textFields[0];
    const phoneNumberField = await $(`-ios class chain:**/XCUIElementTypeTextField[\`value == "Phone number"\`]`);

    const getCodeButton = $(`-ios predicate string:name == "Get code"`);

    await countryCodeField.waitForExist({ timeout: 10000 });
    await phoneNumberField.waitForExist({ timeout: 10000 });
    await getCodeButton.waitForExist({ timeout: 10000 });

    await countryCodeField.click();
    await countryCodeField.clearValue();
    
    console.log("Cleared country code field");

    await phoneNumberField.click();
    await phoneNumberField.clearValue()
    console.log("Cleared phone number field");

    await countryCodeField.click();
    await countryCodeField.clearValue();
    await countryCodeField.setValue("+54");


    await phoneNumberField.click();
    await phoneNumberField.clearValue();
    await phoneNumberField.setValue("91156062207");


    await driver.waitUntil(
      async () => await getCodeButton.isEnabled(),
      {
        timeout: 10000,
        timeoutMsg: "Get code button did not become enabled",
      }
    );

    await getCodeButton.click();
    console.log("Clicked Get code button");

    // --- Verify some result (optional placeholder) ---
    // Example: wait for OTP field or next screen
    // const otpField = await $(`-ios predicate string:value == "Enter code"`);
    // await otpField.waitForExist({ timeout: 10000 });
  });
});
