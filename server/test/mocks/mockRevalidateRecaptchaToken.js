module.exports = async function validateRecaptchaTokenMock(token) {
  // Simulate successful validation for a specific token
  if (token === "valid-token") {
    return true;
  }

  // Simulate failed validation for other tokens
  return false;
};
