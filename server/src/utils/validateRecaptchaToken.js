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
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}

module.exports = validateRecaptchaToken;
