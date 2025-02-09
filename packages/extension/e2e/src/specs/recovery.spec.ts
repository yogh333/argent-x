import { expect } from "@playwright/test"

import config from "../config"
import test from "../test"

test.describe("Recovery Wallet", () => {
  test("User should be able to recove wallet using seed phrase", async ({
    extension,
  }) => {
    await extension.wallet.newWalletOnboarding()
    await extension.open()
    await expect(extension.network.networkSelector).toBeVisible()

    await extension.settingsButton.click()
    await extension.settings.showRecoveryPhase.click()
    await extension.wallet.password.fill(config.password)
    await extension.navigation.continue.click()
    await extension.settings.copy.click()
    await extension.navigation.back.click()

    await extension.lockWallet.click()
    await extension.reset.click()
    await extension.confirmReset.click()

    await extension.wallet.restoreExistingWallet.click()
    await extension.paste()
    await extension.navigation.continue.click()

    await extension.wallet.password.fill(config.password)
    await extension.wallet.repeatPassword.fill(config.password)

    await extension.navigation.continue.click()
    await expect(extension.wallet.finish.first()).toBeVisible()

    await extension.open()
    await expect(extension.network.networkSelector).toBeVisible()
  })
})
