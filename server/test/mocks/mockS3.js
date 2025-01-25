module.exports = {
  uploadFileToS3: async (file, fileKey) => {
    if (!file || !fileKey) {
      throw new Error("Invalid file or file key");
    }
    return `Mocked upload of ${fileKey}`;
  },
  mockDeleteFileFromS3: async (fileKey) => {
    if (!fileKey) {
      throw new Error("Invalid file key");
    }
    return `Mocked deletion of ${fileKey}`;
  },
};
