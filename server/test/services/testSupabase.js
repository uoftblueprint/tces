const { client } = require("../../src/configs/supabaseS3Client"); // Import your S3 client
const { ListObjectsCommand } = require("@aws-sdk/client-s3");

// Function to test S3-compatible connection and fetch data (list objects) from a bucket
async function testS3Connection() {
  const command = new ListObjectsCommand({
    Bucket: "resume-uploads", // Replace with your actual bucket name
  });

  try {
    const data = await client.send(command); // Send the command to list objects in the bucket
    console.log("Data fetched from S3-compatible bucket:", data.Contents);
  } catch (error) {
    console.error("Error fetching data from S3-compatible storage:", error);
  }
}

// Call the test function
testS3Connection();
