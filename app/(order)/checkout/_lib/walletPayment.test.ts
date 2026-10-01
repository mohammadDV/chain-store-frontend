import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getWalletPaymentStatus } from "./walletPayment.ts";

describe("getWalletPaymentStatus", () => {
  it("marks payment as sufficient when balance covers payable", () => {
    const status = getWalletPaymentStatus(200_000, 150_000);

    assert.equal(status.sufficient, true);
    assert.equal(status.shortfall, 0);
    assert.equal(status.balance, 200_000);
    assert.equal(status.payable, 150_000);
  });

  it("reports shortfall when balance is below payable", () => {
    const status = getWalletPaymentStatus(100_000, 250_000);

    assert.equal(status.sufficient, false);
    assert.equal(status.shortfall, 150_000);
  });

  it("treats invalid numbers as zero", () => {
    const status = getWalletPaymentStatus(Number.NaN, Number.POSITIVE_INFINITY);

    assert.equal(status.balance, 0);
    assert.equal(status.payable, 0);
    assert.equal(status.sufficient, true);
  });
});
