// Import the following modules used for mocking requests and responses
const { getMockReq, getMockRes } = require('@jest-mock/express');
// The unit tests test the interactions between the controller and the model. Therefore, specify the controller and model that are needed
const jobController = require('../../controllers/job.controller');
const Job = require('../../models/job.model');

jest.mock('../../models/job.model', () => ({
  getJobById: jest.fn(),
  createJob: jest.fn()
}));

const { res, next, clearMockRes } = getMockRes();
// Specify any mock arguments that will be passed to the mock functions
const mockJobResponse = {
    id: "6386cdb138e0e6d17f1fefd9",
    title: "Test Job",
    creation_date: "2022-11-29",
    owner_id: "22222222",
    creator_id: "00000000",
    timeline: "",
    employer_id: "11111111"
};
// Testing whether errors are handled properly is also needed. 
const mockError = new Error('Unable to find matching document with id: 1');

describe('Job Controller unit tests', () => {
  beforeEach(() => {
    clearMockRes();
  });

  test('should get job by id that is valid', async () => {
    const req = getMockReq({ params: { id: "6386cdb138e0e6d17f1fefd9" } });
    Job.getJobById.mockResolvedValueOnce(mockJobResponse);
    await jobController.getJobById(req, res, next);
    expect(Job.getJobById).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.status).toBe(200); 
  });

  test('should give an error when getting job by id that is invalid', async () => {
    const req = getMockReq({ params: { id: "1" } });
    Job.getJobById.mockRejectedValue(mockError);
    await jobController.getJobById(req, res, next);
    expect(next).toHaveBeenCalledWith(mockError);
    expect(res.status).toBe(404);
  });

});