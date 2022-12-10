// Import the following modules used for mocking requests and responses
const { getMockReq, getMockRes } = require('@jest-mock/express');
// The unit tests test the interactions between the controller and the model
// The controller and model that are needed are specified below
const jobController = require('../../controllers/job.controller');
const Job = require('../../models/job.model');

jest.mock('../../models/job.model', () => ({
  getJobById: jest.fn(),
  createJob: jest.fn()
}));

const { res, next, clearMockRes } = getMockRes();
// Specify any mock arguments that will be passed to the mock functions
const mockJobData = {
  id: "6386cdb138e0e6d17f1fefd9",
  title: "Test Job",
  creation_date: "2022-11-29",
  owner_id: "22222222",
  creator_id: "00000000",
  timeline: "",
  employer_id: "11111111"
};
const mockCreateJobSuccess = `Successfully created a new job with id ${mockJobData.id}`;
// Testing whether errors are handled properly is also needed. 
const mockGetJobByIdError = new Error('Unable to find matching document with id: abcdefghijklmnopqrstuvwx');
const mockCreateJobError = new Error("Failed to create a new job.");

describe('Job Controller Unit Tests', () => {
  beforeEach(() => {
    clearMockRes();
  });

  test('should get job by id successfully', async () => {
    const req = getMockReq({ params: { id: "6386cdb138e0e6d17f1fefd9" } });
    Job.getJobById.mockResolvedValueOnce(mockJobData);
    await jobController.getJobById(req, res, next);
    expect(Job.getJobById).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledTimes(0);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(mockJobData);
    expect(next).toHaveBeenCalledTimes(0);
  });

  test('should give an error when getting job by id', async () => {
    const req = getMockReq({ params: { id: "abcdefghijklmnopqrstuvwx" } });
    Job.getJobById.mockRejectedValue(mockGetJobByIdError);
    await jobController.getJobById(req, res, next);
    expect(Job.getJobById).toHaveBeenCalledTimes(2);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledTimes(0);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(mockGetJobByIdError);
  });

  test('should create new job successfully', async () => {
    const req = getMockReq({ body: mockJobData });
    Job.createJob.mockResolvedValue(mockCreateJobSuccess);
    await jobController.createJob(req, res, next);
    expect(Job.createJob).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(mockCreateJobSuccess);
    expect(next).toHaveBeenCalledTimes(0);
  });

  test('should give an error when creating new job', async () => {
    const req = getMockReq({ body: mockJobData });
    Job.createJob.mockRejectedValue(mockCreateJobError);
    await jobController.createJob(req, res, next);
    expect(Job.createJob).toHaveBeenCalledTimes(2);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).toHaveBeenCalledWith(mockCreateJobError);
    expect(next).toHaveBeenCalledTimes(1);
  });
});