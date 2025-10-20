# 📱 HQF Automated Mobile Testing

This repository contains the **automated mobile testing setup** for the **HighQ Fitness app**, built using **Appium**, **WebdriverIO**, and **TypeScript**.  
It supports both **Android** and **iOS** test execution via the Appium server.

---

## 🧩 Project Overview

The setup validates that the **HighQ Fitness mobile app** builds successfully and runs on emulators or real devices, while also allowing functional and UI tests to be automated.

Current test suites include:
- ✅ Android launch validation  
- (coming soon) iOS app validation  

---

## 🧱 Tech Stack

| Component | Purpose |
|------------|----------|
| **Appium 3.x** | Cross-platform mobile automation framework |
| **WebdriverIO 8+** | Test runner for Appium/Webdriver protocol |
| **Mocha** | Test framework for describing and structuring tests |
| **TypeScript** | Type safety and IntelliSense |
| **Chai** | Assertion library for readable test expectations |

---

## 🧩 Project Structure

```
HQF-automated-mobile-testing/
│
├── tests/
│   ├── specs/
│   │   ├── android/
│   │   │   └── androidLaunchTest.ts
│   │   └── ios/
│   │       └── iosLaunchTest.ts
│   ├── helpers/
│   └── utils/
│
├── wdio.conf.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Install Appium globally (if not installed)

```bash
npm install -g appium
```

### 3️⃣ Install required Appium drivers

```bash
appium driver install uiautomator2
appium driver install xcuitest
```

You can check installed drivers with:
```bash
appium driver list --installed
```

---

## ▶️ Running the Tests

### 🧠 Step 1 — Start the Appium server

In a new terminal:
```bash
npx appium
```

You should see output like:
```
[Appium] Appium REST http interface listener started on http://0.0.0.0:4723
[Appium] Available drivers:
[Appium]   - uiautomator2@5.0.5 (automationName 'UiAutomator2')
[Appium]   - xcuitest@10.2.2 (automationName 'XCUITest')
```

---

### 🧠 Step 2 — Run Android Tests

Run using the WDIO runner:
```bash
npx wdio run wdio.conf.ts
```

Or use the package script:
```bash
npm run test:android
```

✅ Expected output:
```
Android App Launch
  ✓ should launch the HighQ Fitness Android app (5s)
```

---

## 🧪 Example Test — `androidLaunchTest.ts`

```ts
import { expect } from "chai";

describe("Android App Launch", () => {
  before(async () => {
    console.log("🔧 Setting up Android test session...");
  });

  it("should launch the HighQ Fitness Android app", async () => {
    const activity = await driver.getCurrentActivity();
    console.log("📱 Current activity:", activity);
    expect(activity).to.not.be.empty;

    try {
      const element = await $("android=new UiSelector().text(\"Login\")");
      expect(await element.isDisplayed()).to.be.true;
      console.log("✅ Login button is visible");
    } catch {
      console.log("⚠️ Could not find Login element (maybe another screen)");
    }
  });

  after(async () => {
    console.log("🧹 Cleaning up Android session...");
    await driver.deleteSession();
  });
});
```

---

## ⚙️ `wdio.conf.ts` — Configuration Example

```ts
import { Config } from "@wdio/types";

export const config: Config = {
  runner: "local",
  framework: "mocha",
  specs: ["./tests/specs/android/**/*.ts"],
  maxInstances: 1,

  capabilities: [
    {
      platformName: "Android",
      "appium:deviceName": "Medium_Phone_API_36.1",
      "appium:platformVersion": "15",
      "appium:automationName": "UiAutomator2",
      "appium:app":
        "/Users/jimenanemina/Repos/highQFitness/HQF-android-ios/android/app-mobile/build/intermediates/apk/dev/debug/app-mobile-dev-debug.apk",
      "appium:noReset": true,
      "appium:avd": "Medium_Phone_API_36.1",
    },
  ],

  port: 4723,
  path: "/",
  services: [], // Appium started manually
  reporters: ["spec"],

  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
};
export default config;
```

---

## 🧩 Run iOS Tests (coming soon)

Once iOS build integration is ready, add the XCUITest capability:
```json
{
  "platformName": "iOS",
  "appium:automationName": "XCUITest",
  "appium:deviceName": "iPhone 15",
  "appium:platformVersion": "17.0",
  "appium:app": "<path_to_app>/HQF.ipa"
}
```

Then:
```bash
npm run test:ios
```

---

## 🧹 Common Fixes

| Issue | Solution |
|--------|-----------|
| **`driver not found`** | Reinstall Appium drivers using `appium driver install uiautomator2` |
| **`stream.on is not a function`** | Make sure you’re not using Node FormData with Appium fetch (WDIO handles it automatically) |
| **`Cannot connect to emulator`** | Ensure your Android emulator is started (`adb devices`) before running the test |
| **`Could not find a driver for UiAutomator2`** | Run `appium driver list --installed` and verify driver location |

---

## 🧠 Next Steps

- [ ] Add Page Object Models for reusable selectors  
- [ ] Integrate Allure reporter  
- [ ] Add iOS testing capability  
- [ ] Integrate CI/CD execution with test artifacts

---

## 🧑‍💻 Author

**QA Automation Setup by Jimena Nemiña**  
📍 HighQ Fitness — QA Automation Framework  
🧠 Stack: TypeScript • Appium • WebdriverIO • Mocha

---

> _“Test the app like a user, build the framework like an engineer.”_
