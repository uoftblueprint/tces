// Simulates createJobPost function, which would add the job post to the database

function mockFetch(jobPostData, currUserId) {
  const timeout = 1000;
  console.log(jobPostData, currUserId);
  return new Promise((resolve, reject) => {
    console.log(reject);
    // Simulate error
    setTimeout(() => {
      reject(new Error("Failure"));
    }, timeout);

    // Simulate success
    // setTimeout(() => {
    //   resolve({ ok: 200, jobPostData, currUserId });
    // }, timeout);
  });
}

export default mockFetch;
