require("dotenv").config();
const { S3Client } = require("@aws-sdk/client-s3");

const client = new S3Client({
  forcePathStyle: true,
  region: "us-east-1", // Your project region as shown in the Supabase dashboard
  endpoint: process.env.SUPABASE_URL, // Your Supabase S3-compatible endpoint
  credentials: {
    accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY_ID, // Access Key ID from .env
    secretAccessKey: process.env.SUPABASE_S3_SECRET_ACCESS_KEY, // Secret Access Key from .env
  },
});

module.exports = { client };
