require("dotenv").config();
const logger = require("pino")();
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * Uploads a file to an S3 bucket.
 *
 * @param {Object} file - The file to upload, containing buffer and MIME type.
 * @param {Buffer} file.buffer - The file content as a buffer.
 * @param {string} file.mimetype - The MIME type of the file.
 * @param {string} fileName - The name to assign to the file in the S3 bucket.
 * @returns {void}
 * @throws {Error} - Throws an error if the upload fails.
 */
const uploadFileToS3 = async (file, fileName) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);
  try {
    await s3Client.send(command);
    logger.info(`Successfully uploaded ${fileName} to S3`);
  } catch (error) {
    logger.error({ error }, "Error uploading file to S3");
    throw new Error("Failed to upload file to S3");
  }
};

/**
 * Generates a presigned URL for a file stored in an S3 bucket.
 *
 * @param {string} fileKey - The key of the file in the S3 bucket.
 * @returns {string} - A presigned URL for accessing the file, valid for 5 minutes.
 * @throws {Error} - Throws an error if the URL generation fails.
 */
const getResumePresignedUrl = async (fileKey) => {
  const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileKey,
  };

  const command = new GetObjectCommand(params);
  try {
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 }); // URL expires in 5 minutes
    return signedUrl;
  } catch (error) {
    logger.error({ error }, "Error generating presigned URL");
    throw new Error("Failed to generate presigned URL");
  }
};

/**
 * Deletes a file from an S3 bucket.
 *
 * @param {string} fileKey - The key of the file in the S3 bucket.
 * @returns {void}
 * @throws {Error} - Throws an error if the file deletion fails.
 */
const deleteFileFromS3 = async (fileKey) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileKey,
  };

  try {
    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);
    logger.info(
      `Successfully deleted ${fileKey} from ${process.env.S3_BUCKET_NAME}`
    );
  } catch (error) {
    logger.error({ error }, "Error deleting the file");
    throw new Error("Failed to delete file from S3");
  }
};

module.exports = { uploadFileToS3, getResumePresignedUrl, deleteFileFromS3 };
