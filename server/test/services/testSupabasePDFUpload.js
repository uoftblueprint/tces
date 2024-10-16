const { client } = require("../../src/configs/supabaseS3Client"); // Import the S3 client
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs"); // Required to read the PDF file from the filesystem
const path = require("path"); // Required for handling file paths

// Function to upload a PDF file to Supabase Storage
async function uploadPDFToSupabase() {
  const filePath = path.join(__dirname, "example.pdf"); // Path to your PDF file
  const fileContent = fs.readFileSync(filePath); // Read the PDF file content into a buffer

  const command = new PutObjectCommand({
    Bucket: "resume-uploads", // Replace with your actual storage bucket name
    Key: "pdfs/example.pdf", // Path where the PDF will be stored
    Body: fileContent, // The file content (Buffer)
    ContentType: "application/pdf", // MIME type for PDF
  });

  try {
    const data = await client.send(command); // Send the upload request to Supabase
    console.log("PDF uploaded successfully:", data);
  } catch (error) {
    console.error("Error uploading PDF to Supabase Storage:", error);
  }
}

// Call the function to upload the PDF
uploadPDFToSupabase();
