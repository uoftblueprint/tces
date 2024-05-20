import { describe, it, expect, beforeEach, vi } from "vitest";
import * as emailSender from "../../../src/middlewares/email/emailSender";

beforeEach(() => {
  vi.resetAllMocks();
  vi.mock("../../../src/middlewares/email/emailSender", () => {
    const sendEmail = vi.fn();
    const checkClientClosureForMonth = vi.fn(() => Promise.resolve([]));

    // imitation of how our real checkClientClosures is implemented
    const checkClientClosures = async () => {
      const clients = await checkClientClosureForMonth();
      console.log(`Found ${clients.length} clients to send emails to.`);
      if (clients.length > 0) {
        clients.forEach((client) => {
          emailSender.sendEmail(client);
        });
      }
    };

    return {
      sendEmail,
      checkClientClosureForMonth,
      checkClientClosures,
    };
  });
});

describe("Email sender module tests", () => {
  let sendEmailSpy;

  beforeEach(() => {
    sendEmailSpy = vi.spyOn(emailSender, "sendEmail");
  });

  describe("no emails to be sent out", () => {
    it("checks if sendEmail has not been called", async () => {
      emailSender.checkClientClosureForMonth.mockResolvedValue([]);
      await emailSender.checkClientClosures();
      expect(sendEmailSpy).not.toHaveBeenCalled();
    });
  });

  describe("email to be sent out", () => {
    it("checks if sendEmail has been called", async () => {
      emailSender.checkClientClosureForMonth.mockResolvedValue([
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
      await emailSender.checkClientClosures();
      expect(sendEmailSpy).toHaveBeenCalledTimes(1);
    });
  });
});
