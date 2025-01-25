require("dotenv").config();

/**
 * Validates a reCAPTCHA token with Google's API.
 * @param {string} token - The reCAPTCHA token provided by the client.
 * @returns {Promise<boolean>} - Returns true if the token is valid, otherwise false.
 */
async function validateRecaptchaToken(token) {
  const url = "https://www.google.com/recaptcha/api/siteverify";
  const params = new URLSearchParams();
  params.append("secret", process.env.RECAPTCHA_SECRET_KEY);
  params.append("response", token);

  try {
    // Make a POST request with fetch
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    // Parse the response JSON
    const data = await response.json();
    if (data.success) {
      console.log("reCAPTCHA token is valid.");
      return true;
    } else {
      console.error("reCAPTCHA validation failed:", data["error-codes"]);
      return false;
    }
  } catch (error) {
    console.error("Error validating reCAPTCHA token:", error);
    return false;
  }
}

module.exports = validateRecaptchaToken;
