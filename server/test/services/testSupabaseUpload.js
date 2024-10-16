const { client } = require("../../src/configs/supabaseS3Client"); // Import the S3 client
const { PutObjectCommand } = require("@aws-sdk/client-s3");

// Function to test uploading a file to Supabase Storage
async function testUploadToSupabaseStorage() {
  const fileContent = Buffer.from("Hello Supabase!"); // Convert file content to a Buffer (AWS SDK requires a buffer or stream)

  const command = new PutObjectCommand({
    Bucket: "resume-uploads", // Replace with your actual storage bucket name
    Key: "test/test.txt", // Path to store the file
    Body: fileContent, // The file content
    ContentType: "text/plain", // MIME type of the file
  });

  try {
    const data = await client.send(command); // Send the upload request to Supabase
    console.log("File uploaded successfully:", data);
  } catch (error) {
    console.error("Error uploading file to Supabase Storage:", error);
  }
}

// Call the test function
testUploadToSupabaseStorage();
