const vi = require("vitest").vi;

const mockDeleteFileFromS3 = vi.fn(async (fileKey) => {
  if (!fileKey) {
    throw new Error("Invalid file key");
  }
  return `Deleted ${fileKey}`;
});

module.exports = { mockDeleteFileFromS3 };
