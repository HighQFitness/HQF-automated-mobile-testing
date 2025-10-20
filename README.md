# 📱 HQF Automated Mobile Testing

This repository contains automated mobile UI tests for the **HighQ Fitness (HQF)** app, built with **WebdriverIO**, **Appium**, and **TypeScript**.

---

## 🧩 Project Overview

The goal of this project is to validate the main navigation and core user flows of the HQF Android and iOS applications through end-to-end UI tests.

Current coverage includes:
- ✅ Navigation bar validations (Home, Devices, Feedback)
- ✅ Home page content checks (e.g. "Start workout" button)
- ✅ Cross-screen navigation recovery
- ⚙️ Utility helpers for consistent navigation and synchronization

---

## 📁 Project Structure

```
HQF-AUTOMATED-MOBILE-TESTING/
├── node_modules/
├── tests/
│   ├── helpers/
│   │   └── navigationHelper.ts           # Common reusable functions
│   ├── specs/
│   │   ├── android/
│   │   │   └── navBarValidations.ts      # Android UI tests
│   │   └── iOS/                          # (Reserved for future iOS tests)
│   └── utils/
│       └── (optional utility scripts)
│
├── package.json
├── tsconfig.json
├── wdio.conf.ts                          # WebdriverIO configuration
├── README.md
└── .gitignore
```

---

## ⚙️ Tech Stack

| Tool | Purpose |
|------|----------|
| **WebdriverIO** | Test runner and automation framework |
| **Appium** | Mobile automation engine for Android & iOS |
| **TypeScript** | Type-safe test development |
| **Chai** | Assertions (`expect`, `to.be.true`, etc.) |
| **Mocha** | Test structure and hooks (`describe`, `it`, `afterEach`) |

---

## 🚀 Setup & Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start Appium**
   ```bash
   npx appium
   ```

3. **Run Android tests**
   ```bash
   npx wdio run wdio.conf.ts
   ```

4. *(Optional)* **Run iOS tests**  
   Update capabilities in `wdio.conf.ts` for iOS before executing.

---

## 🧠 Key Helpers

### `navigationHelper.ts`
Handles navigation cleanup between tests to ensure stability and avoid UI overlap between screens.

Example usage:
```ts
import { goHomeSafely } from "../../helpers/navigationHelper";

afterEach(async () => {
  await goHomeSafely();
});
```

---

## 🧪 Example Test (Android)

```ts
import { expect } from "chai";
import type { ChainablePromiseElement } from "webdriverio";
import { goHomeSafely } from "../../helpers/navigationHelper";

describe("Android App Navigation Tests", () => {
  afterEach(async () => {
    await goHomeSafely();
  });

  it("should show Start workout button on Home", async () => {
    const homeNav = await $('~Home_nav_bar');
    await homeNav.click();
    const startWorkoutButton = await $('android=new UiSelector().text("Start workout")');
    await startWorkoutButton.waitForExist({ timeout: 10000 });
    expect(await startWorkoutButton.isDisplayed()).to.be.true;
  });
});
```

---

## 🧭 WDIO Configuration Highlights

In `wdio.conf.ts`:
- Appium service is launched automatically
- Test specs located under `./tests/specs/**/*.ts`
- Default capability set for Android app
- `maxInstances` = `1` to ensure sequential test execution

---

## 🧾 License

 Jimena Nemiña — [jimena@highqfitness.com](mailto:jimena@highqfitness.com)

---
