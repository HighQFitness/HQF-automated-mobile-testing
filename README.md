# 📱 HQF Automated Mobile Testing

Automated mobile test suite for **HighQ Fitness** mobile applications using **Appium v3**, **WebdriverIO**, and **TypeScript**.  
Supports both **Android (UiAutomator2)** and **iOS (XCUITest)** platforms.

---

## 🚀 Overview

This project automates smoke and functional tests for the HighQ Fitness Android and iOS apps.  
It runs against local emulators or connected devices using Appium.

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
├── package.json
├── tsconfig.json
├── wdio.conf.ts
└── README.md
```

---

## ⚙️ Prerequisites

### 1️⃣ Install system dependencies
Ensure you have:
- **Node.js ≥ 18**
- **Java JDK ≥ 11**
- **Android Studio** (for SDK and AVD Manager)
- **Xcode** (for iOS tests on macOS)
- **Appium v3**

### 2️⃣ Install Appium globally (optional)
```bash
npm install -g appium
```

Or simply use the project-local Appium with `npx appium`.

### 3️⃣ Install drivers
From the project root (`HQF-automated-mobile-testing`):
```bash
npx appium driver install uiautomator2
npx appium driver install xcuitest
```

---

## 🧱 Setup

Install project dependencies:
```bash
npm install
```

Verify drivers:
```bash
npx appium driver list --installed
```
Expected output:
```
uiautomator2@5.x.x (automationName 'UiAutomator2')
xcuitest@10.x.x (automationName 'XCUITest')
```

---

## ▶️ Running Tests

### 🟢 1. Start Appium Server
From the project root:
```bash
npx appium
```
You should see:
```
Appium v3.x.x Server is running on 0.0.0.0:4723
Available drivers:
  - uiautomator2
  - xcuitest
```

Keep this terminal open.

---

### 🤖 2. Run Android Test

In a **new terminal window**:
```bash
npx ts-node tests/specs/android/androidLaunchTest.ts
```

Make sure an emulator or device is available:
```bash
emulator -list-avds
emulator -avd Medium_Phone_API_36.1
```

> The app capability should point to a valid APK:
> ```
> /Users/jimenanemina/Repos/highQFitness/HQF-android-ios/android/app-mobile/build/intermediates/apk/dev/debug/app-mobile-dev-debug.apk
> ```

---

### 🍏 3. Run iOS Test (optional)

```bash
npx ts-node tests/specs/ios/iosLaunchTest.ts
```

Ensure the simulator is available:
```bash
xcrun simctl list devices
```

> Update capabilities to point to your `.app` or `.ipa` file.

---

## 🧠 Example Capabilities

### Android (`androidLaunchTest.ts`)
```ts
const caps = {
  platformName: "Android",
  "appium:deviceName": "Medium_Phone_API_36.1",
  "appium:platformVersion": "15",
  "appium:automationName": "UiAutomator2",
  "appium:app":
    "/Users/jimenanemina/Repos/highQFitness/HQF-android-ios/android/app-mobile/build/intermediates/apk/dev/debug/app-mobile-dev-debug.apk",
  "appium:noReset": true,
  "appium:avd": "Medium_Phone_API_36.1",
};
```

### iOS (`iosLaunchTest.ts`)
```ts
const caps = {
  platformName: "iOS",
  "appium:deviceName": "iPhone 15 Pro",
  "appium:platformVersion": "17.0",
  "appium:automationName": "XCUITest",
  "appium:app":
    "/Users/jimenanemina/Repos/highQFitness/HQF-android-ios/ios/build/Debug-iphonesimulator/HighQFitness.app",
  "appium:noReset": true,
};
```

---

## 🧰 Helpful Commands

| Command | Description |
|----------|--------------|
| `npx appium` | Start local Appium server |
| `npx appium driver list --installed` | List installed Appium drivers |
| `emulator -list-avds` | List available Android emulators |
| `emulator -avd <name>` | Start a specific Android emulator |
| `xcrun simctl list devices` | List available iOS simulators |

---

## 🧪 Run Tests Automatically

Add this to your `package.json`:
```json
"scripts": {
  "android:test": "npx appium & sleep 5 && npx ts-node tests/specs/android/androidLaunchTest.ts",
  "ios:test": "npx appium & sleep 5 && npx ts-node tests/specs/ios/iosLaunchTest.ts"
}
```

Then run:
```bash
npm run android:test
```
or
```bash
npm run ios:test
```

---

## 🧹 Cleanup

Stop all running Appium servers:
```bash
pkill -f appium
```

---

## 🪄 Notes

- Keep the APK and app paths up to date after rebuilding.
- Make sure `adb` and `xcrun` are accessible from your PATH.
- If a test fails to connect, confirm the device/emulator is booted and unlocked.

---

### 🧑‍💻 Maintainer
**Jimena Nemiña**  
HQF QA Automation Engineer  
📍 HighQ Fitness QA Suite — Android & iOS
