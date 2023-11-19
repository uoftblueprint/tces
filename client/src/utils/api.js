// eslint-disable-next-line prefer-destructuring
const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const login = async (email, password) => {
  try {
    const response = await fetch(`${REACT_APP_API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: email, password }),
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export default login;
