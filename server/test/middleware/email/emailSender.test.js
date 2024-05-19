import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  checkClientClosureForMonth,
  checkClientClosures,
  sendEmail,
} from "../../../src/middlewares/email/emailSender.js";

beforeEach(() => {
  vi.resetAllMocks();
  vi.mock("../../../src/middlewares/email/emailSender.js");
  vi.mocked(sendEmail).mockReturnValue();
});

describe("no emails to be sent out", () => {
  vi.mocked(checkClientClosureForMonth).mockReturnValue([]);
  const emailSpy = vi.spyOn({ sendEmail }, "sendEmail");

  it("checks if sendEmail has not been called", async () => {
    await checkClientClosures();
    expect(emailSpy).not.toHaveBeenCalled();
  });
});

describe("email to be sent out", () => {
  vi.mocked(checkClientClosureForMonth).mockReturnValue([
    {
      id: 1,
      owner: 1,
      creator: 1,
      date_added: new Date("2022-01-01T00:00:00.000Z").toISOString(),
      date_updated: new Date("2022-01-15T00:00:00.000Z").toISOString(),
      name: "first last",
      email: "test@gmail.com",
      phone_number: "333-333-3333",
      status: "closed",
      closure_date: new Date("2022-02-01T00:00:00.000Z").toISOString(),
      status_at_exit: "employed",
      status_at_3_months: "no_results",
      status_at_6_months: "no_results",
      status_at_9_months: "no_results",
      status_at_12_months: "no_results",
    },
  ]);
  const emailSpy = vi.spyOn({ sendEmail }, "sendEmail");

  it("checks if sendEmail has been called", async () => {
    await checkClientClosures();
    expect(emailSpy).toHaveBeenCalled();
  });
});
