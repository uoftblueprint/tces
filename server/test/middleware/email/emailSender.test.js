import { describe, it, expect, vi } from 'vitest';
const Client = require("../../../src/models/client.model'");
import { checkClientClosures, sendEmail } from '../../../src/middlewares/email/emailSender.js'

describe('no emails to be sent out', () => {
  beforeEach(() => {
    ClientModel.findAll.mockResolvedValue([]);
  });

  it('checks if sendEmail has not been called', async () => {

    await checkClientClosures();
    expect(sendEmail).not.toHaveBeenCalled();
  });
});

describe('email to be sent out', () => {
  beforeEach(() => {
    vi.mocked(Client.findAll).mockResolvedValue([
      {
        id: 1,
        owner: 1, 
        creator: 1,
        date_added: new Date('2022-01-01T00:00:00.000Z').toISOString(),
        date_updated: new Date('2022-01-15T00:00:00.000Z').toISOString(),
        name: 'asdasdsad sadadsaa',
        email: 'test@gmail.com',
        phone_number: '333-333-3333',
        status: 'closed',
        closure_date: new Date('2022-02-01T00:00:00.000Z').toISOString(),
        status_at_exit: 'employed',
        status_at_3_months: 'employed',
        status_at_6_months: 'employed',
        status_at_9_months: 'no_results', 
        status_at_12_months: 'no_results', 
      },
    ]);
  });

  it('checks if sendEmail has been called', async () => {
    await checkClientClosures();
    expect(sendEmail).toHaveBeenCalledTimes(1);
  });
});